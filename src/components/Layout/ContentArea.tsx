import React from 'react';
import { Layout } from 'antd';
import { 
  FileTextOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import Dashboard from '../Dashboard/Dashboard';
import SystemSettings from '../Settings/SystemSettings';
import PersonalProfile from '../Profile/PersonalProfile';
import AdminPanel from '../Admin/AdminPanel';
import TeamManagement from '../Team/TeamManagement';
import {NavigationPage} from "../../types";
import {useThemeStyles} from "../../hooks";
import Placeholder from "../Common/Placeholder.tsx";
const { Content } = Layout;

interface ContentAreaProps {
  currentPage: NavigationPage;
  children?: React.ReactNode;
}

const ContentArea: React.FC<ContentAreaProps> = ({ currentPage, children }) => {
  const { layoutStyles, themeConfig } = useThemeStyles();

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

    if (themeConfig.presetTheme === 'luxury') {
      return (
        <>
          <div className="luxury-bg-pattern" />
          <div className="luxury-floating-elements">
            <div className="floating-diamond diamond-1">◆</div>
            <div className="floating-diamond diamond-2">◇</div>
            <div className="floating-diamond diamond-3">◈</div>
            <div className="floating-crown">♔</div>
            <div className="floating-star">★</div>
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
      {renderThemeDecorations()}
      {renderPageContent()}
    </Content>
  );
};

export default ContentArea;
