import { create, StateCreator } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import authService from "../services/api/authService.ts";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  roles: string[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => boolean;
  setLoading: (loading: boolean) => void;
}

const authStoreCreator: StateCreator<AuthState> = (set, get) => ({
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true });
    try {
      const res = await authService.login(credentials);
      set({
        // user: res.user,
        user: {
          id: '1',
          name: 'Admin User',
          email: 'admin@company.com',
          roles: ['admin', 'user']
        },
        token: res.accessToken,
        refreshToken: res.refreshToken,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      await authService.logout();
    } finally {
      set({
        user: null,
        token: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  checkAuth: () => {
    const { token, user } = get();
    const isValid = !!(token && user);
    if (isValid !== get().isAuthenticated) {
      set({ isAuthenticated: isValid });
    }
    return isValid;
  },

  setLoading: (loading: boolean) => set({ isLoading: loading }),
});

export const useAuthStore = create<AuthState>()(
    persist(
        authStoreCreator,
        {
          name: 'auth-storage',
          storage: createJSONStorage(() => localStorage),
          partialize: (state): Partial<AuthState> => ({
            user: state.user,
            token: state.token,
            refreshToken: state.refreshToken,
            isAuthenticated: state.isAuthenticated,
          }),
        }
    )
);