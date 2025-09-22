import React, { useState } from 'react';
import { Layout } from 'antd';
import { useNavigation, useThemeStyles } from '../../hooks';
import Sidebar from './Sidebar';
import AppHeader from './AppHeader';
import ContentArea from './ContentArea';

interface AppLayoutProps {
  children?: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
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
        />
      </Layout>
    </Layout>
  );
};

export default AppLayout;
