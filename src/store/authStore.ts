import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  checkAuth: () => boolean;
  setLoading: (loading: boolean) => void;
}

// 模拟API调用
const mockLogin = async (credentials: LoginCredentials): Promise<{ user: User; token: string }> => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // 简单的模拟验证
  if (credentials.email === 'admin@company.com' && credentials.password === 'admin123') {
    return {
      user: {
        id: '1',
        name: 'Admin User',
        email: 'admin@company.com',
        roles: ['admin', 'user']
      },
      token: 'mock-jwt-token-admin'
    };
  } else if (credentials.email === 'user@company.com' && credentials.password === 'user123') {
    return {
      user: {
        id: '2',
        name: 'Regular User',
        email: 'user@company.com',
        roles: ['user']
      },
      token: 'mock-jwt-token-user'
    };
  } else {
    throw new Error('Invalid email or password');
  }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true });
        try {
          const { user, token } = await mockLogin(credentials);
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false
        });
      },

      checkAuth: () => {
        const { token, user } = get();
        const isValid = !!(token && user);
        if (isValid !== get().isAuthenticated) {
          set({ isAuthenticated: isValid });
        }
        return isValid;
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);