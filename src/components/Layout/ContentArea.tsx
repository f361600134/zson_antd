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

const { Content } = Layout;

interface ContentAreaProps {
  currentPage: NavigationPage;
  children?: React.ReactNode;
}

const ContentArea: React.FC<ContentAreaProps> = ({ currentPage, children }) => {
  const { layoutStyles, themeConfig } = useThemeStyles();

  const placeholderStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '80px 0',
    position: 'relative',
    zIndex: 10
  };

  const placeholderIconStyle: React.CSSProperties = {
    fontSize: '48px',
    marginBottom: '16px',
    color: themeConfig.themeMode === 'dark' ? '#434343' : '#d1d5db'
  };

  const placeholderTitleStyle: React.CSSProperties = {
    fontSize: '20px',
    color: themeConfig.themeMode === 'dark' ? '#8c8c8c' : '#6b7280'
  };

  const placeholderTextStyle: React.CSSProperties = {
    color: themeConfig.themeMode === 'dark' ? '#595959' : '#9ca3af'
  };

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
        return (
          <div style={placeholderStyle}>
            <FileTextOutlined style={placeholderIconStyle} />
            <h3 style={placeholderTitleStyle}>
              Documents Page
            </h3>
            <p style={placeholderTextStyle}>
              This page is under development
            </p>
          </div>
        );
      case 'analytics':
        return (
          <div style={placeholderStyle}>
            <BarChartOutlined style={placeholderIconStyle} />
            <h3 style={placeholderTitleStyle}>
              Analytics Page
            </h3>
            <p style={placeholderTextStyle}>
              This page is under development
            </p>
          </div>
        );
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
