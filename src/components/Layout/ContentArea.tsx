import React from 'react';
import { Layout } from 'antd';
import { useThemeStyles } from '../../hooks';
import PageRouter from './PageRouter';
import type { NavigationPage } from '../../types';

const { Content } = Layout;

interface ContentAreaProps {
  currentPage: NavigationPage;
  children?: React.ReactNode;
  userRoles?: string[];
  onNavigate?: (page: NavigationPage) => void;
}

const ContentArea: React.FC<ContentAreaProps> = ({ 
  currentPage, 
  children,
  userRoles = [],
  onNavigate
}) => {
  const { layoutStyles } = useThemeStyles();

  // 主内容样式，确保在装饰元素之上
  const mainContentStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 10
  };

  // 如果有 children，优先渲染 children（用于特殊场景如 Dashboard）
  // 否则使用配置驱动的页面路由
  const renderContent = () => {
    if (children && currentPage === 'dashboard') {
      return children;
    }

    return (
      <PageRouter
        currentPage={currentPage}
        userRoles={userRoles}
        onNavigate={onNavigate}
        enableAccessControl={true}
      />
    );
  };

  return (
    <Content style={layoutStyles.content}>
      {/* 主要内容 - 在前景层 */}
      <div style={mainContentStyle}>
        {renderContent()}
      </div>
    </Content>
  );
};

export default ContentArea;