import axios from 'axios';
import AxiosInstance = Axios.AxiosInstance;

// API 基础配置
const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  TIMEOUT: 10000, // 10秒超时
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1秒重试间隔
};

// 请求/响应接口定义
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
  success: boolean;
  timestamp?: string;
}

export interface ApiError {
  code: number;
  message: string;
  details?: any;
}

// 请求配置扩展
export interface RequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
  skipErrorHandler?: boolean;
  retryAttempts?: number;
}

class HttpClient {
  private axiosInstance: AxiosInstance;
  private requestQueue: Map<string, AbortController> = new Map();

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // 请求拦截器
    this.axiosInstance.interceptors.request.use(
      (config) => {
        return this.handleRequest(config);
      },
      (error) => {
        return Promise.reject(this.handleError(error));
      }
    );

    // 响应拦截器
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return this.handleResponse(response);
      },
      (error) => {
        return Promise.reject(this.handleError(error));
      }
    );
  }

  private handleRequest(config: AxiosRequestConfig): AxiosRequestConfig {
    const token = this.getAuthToken();
    const customConfig = config as RequestConfig;

    // 添加认证头
    if (token && !customConfig.skipAuth) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    // 添加请求ID用于取消重复请求
    const requestId = this.generateRequestId(config);
    if (this.requestQueue.has(requestId)) {
      this.requestQueue.get(requestId)?.abort();
    }

    const controller = new AbortController();
    this.requestQueue.set(requestId, controller);
    config.signal = controller.signal;

    // 请求日志
    if (import.meta.env.DEV) {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
        headers: config.headers,
        data: config.data,
        params: config.params,
      });
    }

    return config;
  }

  private handleResponse(response: AxiosResponse): AxiosResponse {
    const requestId = this.generateRequestId(response.config);
    this.requestQueue.delete(requestId);

    // 响应日志
    if (import.meta.env.DEV) {
      console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, {
        status: response.status,
        data: response.data,
      });
    }

    return response;
  }

  private handleError(error: AxiosError): ApiError {
    const requestId = this.generateRequestId(error.config);
    this.requestQueue.delete(requestId);

    // 错误日志
    if (import.meta.env.DEV) {
      console.error(`❌ API Error: ${error.config?.method?.toUpperCase()} ${error.config?.url}`, {
        status: error.response?.status,
        message: error.message,
        data: error.response?.data,
      });
    }

    // 处理不同类型的错误
    if (axios.isCancel(error)) {
      return {
        code: 0,
        message: 'Request cancelled',
      };
    }

    if (error.code === 'ECONNABORTED') {
      return {
        code: 408,
        message: 'Request timeout',
      };
    }

    if (error.response) {
      // 服务器响应错误
      const { status, data } = error.response;
      return {
        code: status,
        message: data?.message || error.message,
        details: data,
      };
    }

    if (error.request) {
      // 网络错误
      return {
        code: 0,
        message: 'Network error',
      };
    }

    // 其他错误
    return {
      code: -1,
      message: error.message,
    };
  }

  private getAuthToken(): string | null {
    try {
      // 从localStorage或sessionStorage获取token
      const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
      return token;
    } catch {
      return null;
    }
  }

  private generateRequestId(config?: AxiosRequestConfig): string {
    if (!config) return Math.random().toString(36);
    return `${config.method}_${config.url}_${JSON.stringify(config.params || {})}_${JSON.stringify(config.data || {})}`;
  }

  // 重试机制
  private async retryRequest(config: RequestConfig, attempt: number = 1): Promise<AxiosResponse> {
    try {
      return await this.axiosInstance.request(config);
    } catch (error) {
      const maxAttempts = config.retryAttempts || API_CONFIG.RETRY_ATTEMPTS;
      
      if (attempt < maxAttempts && this.shouldRetry(error as AxiosError)) {
        await this.delay(API_CONFIG.RETRY_DELAY * attempt);
        return this.retryRequest(config, attempt + 1);
      }
      
      throw error;
    }
  }

  private shouldRetry(error: AxiosError): boolean {
    // 只对网络错误和5xx服务器错误进行重试
    return !error.response || (error.response.status >= 500 && error.response.status < 600);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // 公共请求方法
  public async get<T = any>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.retryRequest({ ...config, method: 'GET', url });
    return response.data;
  }

  public async post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.retryRequest({ ...config, method: 'POST', url, data });
    return response.data;
  }

  public async put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.retryRequest({ ...config, method: 'PUT', url, data });
    return response.data;
  }

  public async patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.retryRequest({ ...config, method: 'PATCH', url, data });
    return response.data;
  }

  public async delete<T = any>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.retryRequest({ ...config, method: 'DELETE', url });
    return response.data;
  }

  // 上传文件
  public async upload<T = any>(url: string, file: File, onProgress?: (progress: number) => void, config?: RequestConfig): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);

    const uploadConfig: RequestConfig = {
      ...config,
      headers: {
        ...config?.headers,
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(progress);
        }
      },
    };

    const response = await this.retryRequest({ ...uploadConfig, method: 'POST', url, data: formData });
    return response.data;
  }

  // 取消所有请求
  public cancelAllRequests(): void {
    this.requestQueue.forEach(controller => controller.abort());
    this.requestQueue.clear();
  }

  // 取消特定请求
  public cancelRequest(requestId: string): void {
    const controller = this.requestQueue.get(requestId);
    if (controller) {
      controller.abort();
      this.requestQueue.delete(requestId);
    }
  }

  // 设置默认头
  public setDefaultHeader(key: string, value: string): void {
    this.axiosInstance.defaults.headers.common[key] = value;
  }

  // 移除默认头
  public removeDefaultHeader(key: string): void {
    delete this.axiosInstance.defaults.headers.common[key];
  }

  // 更新基础URL
  public setBaseURL(baseURL: string): void {
    this.axiosInstance.defaults.baseURL = baseURL;
  }

  // 获取axios实例
  public getInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}

// 导出单例实例
export const httpClient = new HttpClient();
export default httpClient;