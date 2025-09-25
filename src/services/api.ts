import axios from 'axios';
import { message } from 'antd';
import { authUtils } from '../utils/auth';

// 创建axios实例
const api = axios.create({
    baseURL: 'http://localhost:5050',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 请求拦截器
api.interceptors.request.use(
    (config) => {
        // 添加认证token
        const token = authUtils.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        console.log('发送请求:', config.method?.toUpperCase(), config.url);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
api.interceptors.response.use(
    (response) => {
        console.log('收到响应:', response.status, response.config.url);
        return response;
    },
    (error) => {
        console.error('请求错误:', error.message);

        // 处理401未授权错误
        if (error.response?.status === 401) {
            message.error('登录已过期，请重新登录');
            authUtils.logout();
            // 触发重新渲染，让App组件显示登录页面
            window.location.reload();
            return Promise.reject(error);
        }

        // 处理其他错误
        const errorMessage = error.response?.data?.message || error.message || '请求失败';
        message.error(errorMessage);

        return Promise.reject(error);
    }
);

export default api;