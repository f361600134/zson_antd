import React from 'react';
import { Layout } from 'antd';
import { 
  FileTextOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import { useThemeStyles } from '../../hooks/useThemeStyles';
import Dashboard from '../Dashboard/Dashboard';
import SystemSettings from '../Settings/SystemSettings';
import PersonalProfile from '../Profile/PersonalProfile';
import AdminPanel from '../Admin/AdminPanel';
import TeamManagement from '../Team/TeamManagement';
import type { NavigationPage } from '../../types/navigation';

const { Content } = Layout;

interface ContentAreaProps {
  currentPage: NavigationPage;
  children?: React.ReactNode;
}

const ContentArea: React.FC<ContentAreaProps> = ({ currentPage, children }) => {
  const { layoutStyles, themeConfig } = useThemeStyles();

  const placeholderStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '80px 0'
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

  // 渲染主题背景装饰
  const renderThemeDecorations = () => {
    if (themeConfig.presetTheme === 'compact') {
      return (
        <>
          <div className="knowledge-bg-pattern" />
          <div className="knowledge-floating-icons">
            <div className="floating-book">📚</div>
            <div className="floating-lightbulb">💡</div>
            <div className="floating-tree">🌱</div>
          </div>
        </>
      );
    }
    
    if (themeConfig.presetTheme === 'colorful') {
      return (
        <>
          <div className="elegant-bg-pattern" />
          <div className="elegant-floating-elements">
            <div className="floating-element element-1">✦</div>
            <div className="floating-element element-2">◆</div>
            <div className="floating-element element-3">✧</div>
            <div className="floating-accent">◇</div>
          </div>
        </>
      );
    }
    return null;
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
      {renderThemeDecorations()}
      {renderPageContent()}
    </Content>
  );
};

export default ContentArea;
