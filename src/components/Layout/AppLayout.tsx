import React, { useState } from 'react';
import { Layout } from 'antd';
import { useNavigation, useThemeStyles } from '../../hooks';
import Sidebar from './Sidebar';
import AppHeader from './AppHeader';
import ContentArea from './ContentArea';

interface AppLayoutProps {
  children?: React.ReactNode;
  userRoles?: string[]; // 支持传入用户角色
}

const AppLayout: React.FC<AppLayoutProps> = ({ 
  children, 
  userRoles = ['user'] // 默认角色
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const { currentPage, navigateTo } = useNavigation();
  const { layoutStyles } = useThemeStyles();

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={layoutStyles.layout}>
      <Sidebar 
        collapsed={collapsed}
        currentPage={currentPage}
        onNavigate={navigateTo}
        userRoles={userRoles} // 传递角色用于菜单过滤
      />
      
      <Layout>
        <AppHeader 
          collapsed={collapsed}
          onToggleCollapse={handleToggleCollapse}
          onNavigate={navigateTo}
        />
        
        <ContentArea 
          currentPage={currentPage}
          children={children}
          userRoles={userRoles} // 传递角色用于页面权限控制
          onNavigate={navigateTo} // 传递导航函数
        />
      </Layout>
    </Layout>
  );
};

export default AppLayout;