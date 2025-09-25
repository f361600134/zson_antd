import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

/**
 * 认证守卫 Hook
 * 用于在组件中检查用户认证状态
 */
export const useAuthGuard = (options?: {
  redirectOnUnauthenticated?: boolean;
  requiredRoles?: string[];
}) => {
  const { 
    isAuthenticated, 
    user, 
    checkAuth,
    isLoading 
  } = useAuthStore();

  const {
    redirectOnUnauthenticated = false,
    requiredRoles = []
  } = options || {};

  useEffect(() => {
    // 检查认证状态
    checkAuth();
  }, [checkAuth]);

  // 检查角色权限
  const hasRequiredRole = (roles: string[] = []) => {
    if (!user || roles.length === 0) return true;
    return roles.some(role => user.roles.includes(role));
  };

  // 检查是否有访问权限
  const hasAccess = hasRequiredRole(requiredRoles);

  // 如果需要重定向且未认证
  useEffect(() => {
    if (redirectOnUnauthenticated && !isAuthenticated && !isLoading) {
      // 这里可以实现重定向逻辑
      console.log('Redirecting to login...');
    }
  }, [isAuthenticated, isLoading, redirectOnUnauthenticated]);

  return {
    isAuthenticated,
    user,
    isLoading,
    hasAccess,
    hasRequiredRole,
    userRoles: user?.roles || []
  };
};

/**
 * 角色检查 Hook
 */
export const useRoleCheck = (requiredRoles: string[]) => {
  const { user } = useAuthStore();
  
  const hasRole = (role: string) => {
    return user?.roles.includes(role) || false;
  };

  const hasAnyRole = (roles: string[]) => {
    return roles.some(role => hasRole(role));
  };

  const hasAllRoles = (roles: string[]) => {
    return roles.every(role => hasRole(role));
  };

  const hasRequiredAccess = hasAnyRole(requiredRoles);

  return {
    hasRole,
    hasAnyRole,
    hasAllRoles,
    hasRequiredAccess,
    userRoles: user?.roles || []
  };
};