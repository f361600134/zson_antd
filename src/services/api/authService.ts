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

const baseUrl = 'api/auth';

function setAuthToken(token: string): void {
  localStorage.setItem('auth_token', token);
  httpClient.setDefaultHeader('Authorization', `Bearer ${token}`);
}

function setRefreshToken(token: string): void {
  localStorage.setItem('refresh_token', token);
}

function clearAuthData(): void {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('refresh_token');
  httpClient.removeDefaultHeader('Authorization');
}

export const authService = {
  /**
   * 用户登录
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await httpClient.post<LoginResponse>(
        `${baseUrl}/login`,
        credentials,
        { skipAuth: true }
    );

    if (response.code == 0 && response.data) {
      setAuthToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);
    }

    return response.data;
  },

  /**
   * 用户注册
   */
  async register(userData: RegisterRequest): Promise<User> {
    const response = await httpClient.post<User>(
        `${baseUrl}/register`,
        userData,
        { skipAuth: true }
    );
    return response.data;
  },

  /**
   * 用户登出
   */
  async logout(): Promise<void> {
    try {
      await httpClient.post(`${baseUrl}/logout`);
    } finally {
      clearAuthData();
    }
  },

  /**
   * 获取当前用户信息
   */
  async getCurrentUser(): Promise<User> {
    const response = await httpClient.get<User>(`${baseUrl}/me`);
    return response.data;
  },

  /**
   * 更新用户资料
   */
  async updateProfile(profileData: UpdateProfileRequest): Promise<User> {
    const response = await httpClient.put<User>(
        `${baseUrl}/profile`,
        profileData
    );
    return response.data;
  },

  /**
   * 修改密码
   */
  async changePassword(passwordData: ChangePasswordRequest): Promise<void> {
    const response = await httpClient.put<void>(
        `${baseUrl}/password`,
        passwordData
    );
    return response.data;
  },

  /**
   * 忘记密码
   */
  async forgotPassword(request: ForgotPasswordRequest): Promise<void> {
    const response = await httpClient.post<void>(
        `${baseUrl}/forgot-password`,
        request,
        { skipAuth: true }
    );
    return response.data;
  },

  /**
   * 重置密码
   */
  async resetPassword(request: ResetPasswordRequest): Promise<void> {
    const response = await httpClient.post<void>(
        `${baseUrl}/reset-password`,
        request,
        { skipAuth: true }
    );
    return response.data;
  },

  /**
   * 刷新访问令牌
   */
  async refreshToken(request: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    const response = await httpClient.post<RefreshTokenResponse>(
        `${baseUrl}/refresh-token`,
        request,
        { skipAuth: true }
    );

    if (response.code == 0 && response.data) {
      setAuthToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);
    }

    return response.data;
  },

  /**
   * OAuth 登录
   */
  async oauthLogin(request: OAuthLoginRequest): Promise<LoginResponse> {
    const response = await httpClient.post<LoginResponse>(
        `${baseUrl}/oauth/login`,
        request,
        { skipAuth: true }
    );

    if (response.code == 0 && response.data) {
      setAuthToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);
    }

    return response.data;
  },

  /**
   * 验证邮箱
   */
  async verifyEmail(token: string): Promise<void> {
    const response = await httpClient.post<void>(
        `${baseUrl}/verify-email`,
        { token },
        { skipAuth: true }
    );
    return response.data;
  },

  /**
   * 重发验证邮件
   */
  async resendVerificationEmail(email: string): Promise<void> {
    const response = await httpClient.post<void>(
        `${baseUrl}/resend-verification`,
        { email },
        { skipAuth: true }
    );
    return response.data;
  },

  /**
   * 上传头像
   */
  async uploadAvatar(file: File, onProgress?: (progress: number) => void): Promise<string> {
    const response = await httpClient.upload<{ url: string }>(
        `${baseUrl}/avatar`,
        file,
        onProgress
    );
    return response.data.url;
  },

  // =============================
  // Token 管理工具
  // =============================

  setAuthToken,
  setRefreshToken,
  clearAuthData,

  isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  },

  getAuthToken(): string | null {
    return localStorage.getItem('auth_token');
  },

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  },
};

export default authService;
