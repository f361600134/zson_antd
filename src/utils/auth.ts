// 认证工具函数
export interface UserInfo {
    id: number;
    username: string;
    email: string;
    name: string;
}

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_info';

export const authUtils = {
    // 获取token
    getToken: (): string | null => {
        return localStorage.getItem(TOKEN_KEY);
    },

    // 设置token
    setToken: (token: string): void => {
        localStorage.setItem(TOKEN_KEY, token);
    },

    // 移除token
    removeToken: (): void => {
        localStorage.removeItem(TOKEN_KEY);
    },

    // 获取用户信息
    getUserInfo: (): UserInfo | null => {
        const userStr = localStorage.getItem(USER_KEY);
        return userStr ? JSON.parse(userStr) : null;
    },

    // 设置用户信息
    setUserInfo: (user: UserInfo): void => {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    },

    // 移除用户信息
    removeUserInfo: (): void => {
        localStorage.removeItem(USER_KEY);
    },

    // 检查是否已登录
    isAuthenticated: (): boolean => {
        return !!authUtils.getToken();
    },

    // 登出
    logout: (): void => {
        authUtils.removeToken();
        authUtils.removeUserInfo();
    }
};