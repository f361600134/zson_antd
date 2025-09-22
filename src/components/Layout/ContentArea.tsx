import React from 'react';
import { Layout } from 'antd';
import { 
  FileTextOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import { useThemeStyles } from '../../hooks';
import Dashboard from '../Dashboard/Dashboard';
import SystemSettings from '../Settings/SystemSettings';
import PersonalProfile from '../Profile/PersonalProfile';
import AdminPanel from '../Admin/AdminPanel';
import TeamManagement from '../Team/TeamManagement';
import type { NavigationPage } from '../../types';
import Placeholder from "../Common/Placeholder.tsx";

const { Content } = Layout;

interface ContentAreaProps {
  currentPage: NavigationPage;
  children?: React.ReactNode;
}

const ContentArea: React.FC<ContentAreaProps> = ({ currentPage, children }) => {
  const { layoutStyles } = useThemeStyles();

  // 主内容样式，确保在装饰元素之上
  const mainContentStyle: React.CSSProperties = {
    position: 'relative',
    zIndex: 10
  };

  // 渲染页面内容
  const renderPageContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return children || <Dashboard />;
      case 'settings':
        return <SystemSettings />;
      case 'profile':
        return <PersonalProfile />;
      case 'admin':
        return <AdminPanel />;
      case 'team':
        return <TeamManagement />;
      case 'documents':
        return <Placeholder
            icon={<FileTextOutlined />}
            title="Documents Page"
            text="This page is under development"
        />;
      case 'analytics':
        return <Placeholder
            icon={<BarChartOutlined />}
            title="Analytics Page"
            text="This page is under development"
        />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Content style={layoutStyles.content}>
      {/* 主要内容 - 在前景层 */}
      <div style={mainContentStyle}>
        {renderPageContent()}
      </div>
    </Content>
  );
};

export default ContentArea;
