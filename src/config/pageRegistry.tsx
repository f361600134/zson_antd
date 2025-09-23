import React from 'react';
import { 
  FileTextOutlined,
  BarChartOutlined,
  FileExcelOutlined,
  FilePptOutlined
} from '@ant-design/icons';
import type { NavigationPage } from '../types/navigation';

// 组件懒加载导入
const Dashboard = React.lazy(() => import('../components/Dashboard/Dashboard'));
const SystemSettings = React.lazy(() => import('../components/Settings/SystemSettings'));
const PersonalProfile = React.lazy(() => import('../components/Profile/PersonalProfile'));
const AdminPanel = React.lazy(() => import('../components/Admin/AdminPanel'));
const TeamManagement = React.lazy(() => import('../components/Team/TeamManagement'));
const Placeholder = React.lazy(() => import('../components/Common/Placeholder'));

// 页面配置接口
export interface PageConfig {
  key: NavigationPage;
  component: React.ComponentType;
  title: string;
  description?: string;
  requiresAuth?: boolean;
  roles?: string[];
  fallback?: React.ComponentType;
  meta?: {
    // 用于SEO或其他元数据
    keywords?: string[];
    category?: string;
  };
}

// 创建占位符组件的工厂函数
const createPlaceholder = (icon: React.ReactNode, title: string, text: string) => {
  return React.memo(() => (
    <Placeholder
      icon={icon}
      title={title}
      text={text}
    />
  ));
};

// 页面配置注册表
export const PAGE_REGISTRY: Record<NavigationPage, PageConfig> = {
  dashboard: {
    key: 'dashboard',
    component: Dashboard,
    title: '仪表板',
    description: '系统概览和关键数据展示',
    meta: {
      keywords: ['dashboard', 'overview', 'statistics'],
      category: 'main'
    }
  },
  
  settings: {
    key: 'settings',
    component: SystemSettings,
    title: '系统设置',
    description: '系统配置和个人偏好设置',
    requiresAuth: true,
    meta: {
      keywords: ['settings', 'configuration', 'preferences'],
      category: 'management'
    }
  },
  
  profile: {
    key: 'profile',
    component: PersonalProfile,
    title: '个人资料',
    description: '用户个人信息管理',
    requiresAuth: true,
    meta: {
      keywords: ['profile', 'user', 'personal'],
      category: 'user'
    }
  },
  
  admin: {
    key: 'admin',
    component: AdminPanel,
    title: '管理员面板',
    description: '系统管理和用户管理',
    requiresAuth: true,
    roles: ['admin', 'superadmin'],
    meta: {
      keywords: ['admin', 'management', 'users'],
      category: 'administration'
    }
  },
  
  team: {
    key: 'team',
    component: TeamManagement,
    title: '团队管理',
    description: '团队成员和项目管理',
    requiresAuth: true,
    roles: ['admin', 'manager'],
    meta: {
      keywords: ['team', 'members', 'collaboration'],
      category: 'management'
    }
  },
  
  documents: {
    key: 'documents',
    component: createPlaceholder(
      <FileTextOutlined />, 
      'Documents Page', 
      'This page is under development'
    ),
    title: '文档管理',
    description: '文档存储和管理系统',
    requiresAuth: true,
    meta: {
      keywords: ['documents', 'files', 'storage'],
      category: 'content'
    }
  },
  
  analytics: {
    key: 'analytics',
    component: createPlaceholder(
      <BarChartOutlined />, 
      'Analytics Page', 
      'This page is under development'
    ),
    title: '数据分析',
    description: '业务数据分析和报表',
    requiresAuth: true,
    roles: ['admin', 'analyst'],
    meta: {
      keywords: ['analytics', 'data', 'reports'],
      category: 'insights'
    }
  },

  sheet: {
    key: 'sheet',
    component: createPlaceholder(
      <FileExcelOutlined />, 
      'Spreadsheet Page', 
      'This page is under development'
    ),
    title: '电子表格',
    description: '在线电子表格编辑器',
    requiresAuth: true,
    meta: {
      keywords: ['spreadsheet', 'excel', 'data'],
      category: 'content'
    }
  },

  protocol: {
    key: 'protocol',
    component: createPlaceholder(
      <FilePptOutlined />, 
      'Protocol Page', 
      'This page is under development'
    ),
    title: '协议管理',
    description: '协议文档和演示文稿管理',
    requiresAuth: true,
    meta: {
      keywords: ['protocol', 'presentation', 'documents'],
      category: 'content'
    }
  }
};

// 获取页面配置的工具函数
export const getPageConfig = (page: NavigationPage): PageConfig => {
  return PAGE_REGISTRY[page];
};

// 获取所有页面配置
export const getAllPages = (): PageConfig[] => {
  return Object.values(PAGE_REGISTRY);
};

// 根据角色过滤页面
export const getPagesByRole = (userRoles: string[] = []): PageConfig[] => {
  return getAllPages().filter(page => {
    // 如果页面没有角色要求，则所有用户都可以访问
    if (!page.roles || page.roles.length === 0) {
      return true;
    }
    // 检查用户是否有任何需要的角色
    return page.roles.some(role => userRoles.includes(role));
  });
};

// 检查用户是否有访问特定页面的权限
export const canAccessPage = (page: NavigationPage, userRoles: string[] = []): boolean => {
  const config = getPageConfig(page);
  
  // 如果页面不存在，返回false
  if (!config) return false;
  
  // 如果页面没有角色要求，则所有用户都可以访问
  if (!config.roles || config.roles.length === 0) {
    return true;
  }
  
  // 检查用户是否有任何需要的角色
  return config.roles.some(role => userRoles.includes(role));
};

// 获取默认页面
export const getDefaultPage = (): NavigationPage => {
  return 'dashboard';
};
