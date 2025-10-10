
/**
 * 用户协议对象
 */
export interface UserDto {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    roles: string[];
}

/**
 * 登录凭据
 */
export interface LoginCredentials {
    email: string;
    password: string;
}

/**
 * 校验状态
 */
export interface AuthState {
    user: UserDto | null;
    token: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => boolean;
    setLoading: (loading: boolean) => void;
}


