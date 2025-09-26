import { AxiosRequestConfig } from 'axios';

export const requestInterceptor = (config: AxiosRequestConfig) => {
    // 添加token、日志、默认Header等
    config.headers = {
        ...config.headers,
        'Content-Type': 'application/json',
        'X-App-Platform': 'web',
    };

    // 模拟添加Token
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    console.log('[Request]', config.url, config);
    return config;
};
