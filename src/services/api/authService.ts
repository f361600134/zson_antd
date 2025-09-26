import { httpClient } from '../http/client';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
  UpdateProfileRequest,
  ChangePasswordRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
  OAuthLoginRequest,
} from '../types';

class AuthService {
  private readonly baseUrl = '/auth';

  /**
   * 用户登录
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await httpClient.post<LoginResponse>(
      `${this.baseUrl}/login`,
      credentials,
      { skipAuth: true }
    );
    
    // 登录成功后存储token
    if (response.success && response.data) {
      this.setAuthToken(response.data.accessToken);
      this.setRefreshToken(response.data.refreshToken);
    }
    
    return response.data;
  }

  /**
   * 用户注册
   */
  async register(userData: RegisterRequest): Promise<User> {
    const response = await httpClient.post<User>(
      `${this.baseUrl}/register`,
      userData,
      { skipAuth: true }
    );
    return response.data;
  }

  /**
   * 用户登出
   */
  async logout(): Promise<void> {
    try {
      await httpClient.post(`${this.baseUrl}/logout`);
    } finally {
      // 无论接口是否成功，都清除本地token
      this.clearAuthData();
    }
  }

  /**
   * 获取当前用户信息
   */
  async getCurrentUser(): Promise<User> {
    const response = await httpClient.get<User>(`${this.baseUrl}/me`);
    return response.data;
  }

  /**
   * 更新用户资料
   */
  async updateProfile(profileData: UpdateProfileRequest): Promise<User> {
    const response = await httpClient.put<User>(
      `${this.baseUrl}/profile`,
      profileData
    );
    return response.data;
  }

  /**
   * 修改密码
   */
  async changePassword(passwordData: ChangePasswordRequest): Promise<void> {
    const response = await httpClient.put<void>(
      `${this.baseUrl}/password`,
      passwordData
    );
    return response.data;
  }

  /**
   * 忘记密码
   */
  async forgotPassword(request: ForgotPasswordRequest): Promise<void> {
    const response = await httpClient.post<void>(
      `${this.baseUrl}/forgot-password`,
      request,
      { skipAuth: true }
    );
    return response.data;
  }

  /**
   * 重置密码
   */
  async resetPassword(request: ResetPasswordRequest): Promise<void> {
    const response = await httpClient.post<void>(
      `${this.baseUrl}/reset-password`,
      request,
      { skipAuth: true }
    );
    return response.data;
  }

  /**
   * 刷新访问令牌
   */
  async refreshToken(request: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    const response = await httpClient.post<RefreshTokenResponse>(
      `${this.baseUrl}/refresh-token`,
      request,
      { skipAuth: true }
    );
    
    if (response.success && response.data) {
      this.setAuthToken(response.data.accessToken);
      this.setRefreshToken(response.data.refreshToken);
    }
    
    return response.data;
  }

  /**
   * OAuth登录
   */
  async oauthLogin(request: OAuthLoginRequest): Promise<LoginResponse> {
    const response = await httpClient.post<LoginResponse>(
      `${this.baseUrl}/oauth/login`,
      request,
      { skipAuth: true }
    );
    
    if (response.success && response.data) {
      this.setAuthToken(response.data.accessToken);
      this.setRefreshToken(response.data.refreshToken);
    }
    
    return response.data;
  }

  /**
   * 验证邮箱
   */
  async verifyEmail(token: string): Promise<void> {
    const response = await httpClient.post<void>(
      `${this.baseUrl}/verify-email`,
      { token },
      { skipAuth: true }
    );
    return response.data;
  }

  /**
   * 重发验证邮件
   */
  async resendVerificationEmail(email: string): Promise<void> {
    const response = await httpClient.post<void>(
      `${this.baseUrl}/resend-verification`,
      { email },
      { skipAuth: true }
    );
    return response.data;
  }

  /**
   * 上传头像
   */
  async uploadAvatar(file: File, onProgress?: (progress: number) => void): Promise<string> {
    const response = await httpClient.upload<{ url: string }>(
      `${this.baseUrl}/avatar`,
      file,
      onProgress
    );
    return response.data.url;
  }

  // Token管理方法
  private setAuthToken(token: string): void {
    localStorage.setItem('auth_token', token);
    httpClient.setDefaultHeader('Authorization', `Bearer ${token}`);
  }

  private setRefreshToken(token: string): void {
    localStorage.setItem('refresh_token', token);
  }

  private clearAuthData(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    httpClient.removeDefaultHeader('Authorization');
  }

  /**
   * 检查是否已登录
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  /**
   * 获取存储的token
   */
  getAuthToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * 获取刷新token
   */
  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }
}

// 导出单例实例
export const authService = new AuthService();
export default authService;