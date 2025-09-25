import { useMemo } from 'react';
import type { NavigationPage } from '../types';
import { 
  getPageConfig, 
  canAccessPage, 
  getPagesByRole,
  getDefaultPage,
  PAGE_REGISTRY,
  type PageConfig 
} from '../config/pageRegistry';

interface UsePageRouterOptions {
  userRoles?: string[];
  enableAccessControl?: boolean;
}

interface UsePageRouterReturn {
  // 页面配置相关
  getPageInfo: (page: NavigationPage) => PageConfig | null;
  getCurrentPageInfo: (currentPage: NavigationPage) => PageConfig | null;
  
  // 权限控制相关
  canAccess: (page: NavigationPage) => boolean;
  getAccessiblePages: () => PageConfig[];
  
  // 导航相关
  getDefaultPage: () => NavigationPage;
  isValidPage: (page: string) => page is NavigationPage;
  
  // 页面分组相关
  getPagesByCategory: (category: string) => PageConfig[];
  getAllCategories: () => string[];
}

/**
 * 页面路由相关的 hook
 * 提供页面配置、权限检查、导航等功能
 */
export const usePageRouter = (options: UsePageRouterOptions = {}): UsePageRouterReturn => {
  const {
    userRoles = [],
    enableAccessControl = true
  } = options;

  // 缓存计算结果
  const accessiblePages = useMemo(() => {
    return enableAccessControl ? getPagesByRole(userRoles) : [];
  }, [userRoles, enableAccessControl]);

  const pagesByCategory = useMemo(() => {
    const categories: Record<string, PageConfig[]> = {};
    // 直接获取所有页面配置
    const allPages = Object.values(PAGE_REGISTRY);

    allPages.forEach(pageConfig => {
      const category = pageConfig.meta?.category || 'other';
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(pageConfig);
    });

    return categories;
  }, [enableAccessControl]);

  return {
    // 页面配置相关
    getPageInfo: (page: NavigationPage) => {
      try {
        return getPageConfig(page);
      } catch {
        return null;
      }
    },

    getCurrentPageInfo: (currentPage: NavigationPage) => {
      try {
        return getPageConfig(currentPage);
      } catch {
        return null;
      }
    },

    // 权限控制相关
    canAccess: (page: NavigationPage) => {
      if (!enableAccessControl) return true;
      return canAccessPage(page, userRoles);
    },

    getAccessiblePages: () => accessiblePages,

    // 导航相关
    getDefaultPage,

    isValidPage: (page: string): page is NavigationPage => {
      const validPages: NavigationPage[] = [
        'dashboard', 'settings', 'profile', 'admin', 
        'team', 'documents', 'analytics', 'sheet', 'protocol'
      ];
      return validPages.includes(page as NavigationPage);
    },

    // 页面分组相关
    getPagesByCategory: (category: string) => {
      return pagesByCategory[category] || [];
    },

    getAllCategories: () => {
      return Object.keys(pagesByCategory);
    }
  };
};

/**
 * 简化版本的页面路由 hook
 * 只包含最基本的功能
 */
export const useSimplePageRouter = (userRoles: string[] = []) => {
  return {
    canAccess: (page: NavigationPage) => canAccessPage(page, userRoles),
    getPageTitle: (page: NavigationPage) => getPageConfig(page).title,
    getDefaultPage
  };
};

/**
 * 页面元数据 hook
 * 用于获取当前页面的元数据信息
 */
export const usePageMeta = (currentPage: NavigationPage) => {
  const pageConfig = useMemo(() => getPageConfig(currentPage), [currentPage]);

  return {
    title: pageConfig.title,
    description: pageConfig.description,
    keywords: pageConfig.meta?.keywords || [],
    category: pageConfig.meta?.category || 'default',
    requiresAuth: pageConfig.requiresAuth || false,
    roles: pageConfig.roles || []
  };
};
