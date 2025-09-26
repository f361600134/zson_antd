import { User } from './auth';
import { PaginationResponse, ApiListParams } from './common';

// 用户管理相关类型
export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  roles: string[];
  department?: string;
  position?: string;
  status: 'active' | 'inactive' | 'pending';
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  phone?: string;
  roles?: string[];
  department?: string;
  position?: string;
  status?: 'active' | 'inactive' | 'pending';
}

export interface UserListParams extends ApiListParams {
  status?: 'active' | 'inactive' | 'pending';
  department?: string;
  roles?: string[];
}

export interface UserListResponse extends PaginationResponse<User> {}

export interface UserStatsResponse {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  pendingUsers: number;
  usersByDepartment: Record<string, number>;
  usersByRole: Record<string, number>;
  recentRegistrations: User[];
}

// 角色权限相关类型
export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
}

export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRoleRequest {
  name: string;
  description: string;
  permissions: string[];
}

export interface UpdateRoleRequest {
  name?: string;
  description?: string;
  permissions?: string[];
}

export interface AssignRolesRequest {
  userIds: string[];
  roleIds: string[];
}