import { httpClient } from '../http/client';
import type {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  UserListParams,
  UserListResponse,
  UserStatsResponse,
  Role,
  Permission,
  CreateRoleRequest,
  UpdateRoleRequest,
  AssignRolesRequest,
} from '../types';

class UserService {
  private readonly baseUrl = '/users';

  // 用户管理
  /**
   * 获取用户列表
   */
  async getUsers(params?: UserListParams): Promise<UserListResponse> {
    const response = await httpClient.get<UserListResponse>(this.baseUrl, {
      params,
    });
    return response.data;
  }

  /**
   * 根据ID获取用户
   */
  async getUserById(id: string): Promise<User> {
    const response = await httpClient.get<User>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  /**
   * 创建新用户
   */
  async createUser(userData: CreateUserRequest): Promise<User> {
    const response = await httpClient.post<User>(this.baseUrl, userData);
    return response.data;
  }

  /**
   * 更新用户信息
   */
  async updateUser(id: string, userData: UpdateUserRequest): Promise<User> {
    const response = await httpClient.put<User>(`${this.baseUrl}/${id}`, userData);
    return response.data;
  }

  /**
   * 删除用户
   */
  async deleteUser(id: string): Promise<void> {
    const response = await httpClient.delete<void>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  /**
   * 批量删除用户
   */
  async deleteUsers(ids: string[]): Promise<void> {
    const response = await httpClient.delete<void>(`${this.baseUrl}/batch`, {
      data: { ids },
    });
    return response.data;
  }

  /**
   * 启用/禁用用户
   */
  async toggleUserStatus(id: string, status: 'active' | 'inactive'): Promise<User> {
    const response = await httpClient.patch<User>(`${this.baseUrl}/${id}/status`, {
      status,
    });
    return response.data;
  }

  /**
   * 重置用户密码
   */
  async resetUserPassword(id: string, newPassword: string): Promise<void> {
    const response = await httpClient.patch<void>(`${this.baseUrl}/${id}/reset-password`, {
      password: newPassword,
    });
    return response.data;
  }

  /**
   * 获取用户统计数据
   */
  async getUserStats(): Promise<UserStatsResponse> {
    const response = await httpClient.get<UserStatsResponse>(`${this.baseUrl}/stats`);
    return response.data;
  }

  /**
   * 搜索用户
   */
  async searchUsers(query: string): Promise<User[]> {
    const response = await httpClient.get<User[]>(`${this.baseUrl}/search`, {
      params: { q: query },
    });
    return response.data;
  }

  /**
   * 导出用户数据
   */
  async exportUsers(params?: UserListParams): Promise<Blob> {
    const response = await httpClient.get(`${this.baseUrl}/export`, {
      params,
      responseType: 'blob',
    });
    return response.data;
  }

  /**
   * 导入用户数据
   */
  async importUsers(
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<{ success: number; failed: number; errors: any[] }> {
    const response = await httpClient.upload<{
      success: number;
      failed: number;
      errors: any[];
    }>(`${this.baseUrl}/import`, file, onProgress);
    return response.data;
  }

  // 角色管理
  /**
   * 获取所有角色
   */
  async getRoles(): Promise<Role[]> {
    const response = await httpClient.get<Role[]>('/roles');
    return response.data;
  }

  /**
   * 根据ID获取角色
   */
  async getRoleById(id: string): Promise<Role> {
    const response = await httpClient.get<Role>(`/roles/${id}`);
    return response.data;
  }

  /**
   * 创建新角色
   */
  async createRole(roleData: CreateRoleRequest): Promise<Role> {
    const response = await httpClient.post<Role>('/roles', roleData);
    return response.data;
  }

  /**
   * 更新角色
   */
  async updateRole(id: string, roleData: UpdateRoleRequest): Promise<Role> {
    const response = await httpClient.put<Role>(`/roles/${id}`, roleData);
    return response.data;
  }

  /**
   * 删除角色
   */
  async deleteRole(id: string): Promise<void> {
    const response = await httpClient.delete<void>(`/roles/${id}`);
    return response.data;
  }

  /**
   * 获取所有权限
   */
  async getPermissions(): Promise<Permission[]> {
    const response = await httpClient.get<Permission[]>('/permissions');
    return response.data;
  }

  /**
   * 为用户分配角色
   */
  async assignRoles(data: AssignRolesRequest): Promise<void> {
    const response = await httpClient.post<void>('/users/assign-roles', data);
    return response.data;
  }

  /**
   * 获取用户的角色
   */
  async getUserRoles(userId: string): Promise<Role[]> {
    const response = await httpClient.get<Role[]>(`${this.baseUrl}/${userId}/roles`);
    return response.data;
  }

  /**
   * 移除用户角色
   */
  async removeUserRole(userId: string, roleId: string): Promise<void> {
    const response = await httpClient.delete<void>(
      `${this.baseUrl}/${userId}/roles/${roleId}`
    );
    return response.data;
  }

  // 部门管理
  /**
   * 获取所有部门
   */
  async getDepartments(): Promise<string[]> {
    const response = await httpClient.get<string[]>('/departments');
    return response.data;
  }

  /**
   * 获取部门用户
   */
  async getDepartmentUsers(department: string): Promise<User[]> {
    const response = await httpClient.get<User[]>(`/departments/${department}/users`);
    return response.data;
  }
}

// 导出单例实例
export const userService = new UserService();
export default userService;