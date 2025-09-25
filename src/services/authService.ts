import { UserInfo } from '../utils/auth';

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: UserInfo;
}

export const authService = {
    // 登录
    login: async (credentials: LoginRequest): Promise<LoginResponse> => {
        // 模拟登录API调用
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // 简单的用户名密码验证
                if (credentials.username === 'admin' && credentials.password === '123456') {
                    const response: LoginResponse = {
                        token: 'mock_jwt_token_' + Date.now(),
                        user: {
                            id: 1,
                            username: 'admin',
                            email: 'admin@example.com',
                            name: '管理员'
                        }
                    };
                    resolve(response);
                } else {
                    reject(new Error('用户名或密码错误'));
                }
            }, 1000); // 模拟网络延迟
        });
    },

    // 获取当前用户信息
    getCurrentUser: async (): Promise<UserInfo> => {
        // 模拟获取用户信息API
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    id: 1,
                    username: 'admin',
                    email: 'admin@example.com',
                    name: '管理员'
                });
            }, 500);
        });
    }
};