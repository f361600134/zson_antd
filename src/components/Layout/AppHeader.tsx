import React from 'react';
import { Layout, Dropdown, Typography, Space, Flex, Button } from 'antd';
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuOutlined
} from '@ant-design/icons';
import { useWorkspaceStore } from '../../store/workspaceStore';
import { useThemeStyles } from '../../hooks';
import type { MenuProps } from 'antd';
import type { NavigationPage } from '../../types';
import UserAvatar from "../Common/UserAvatar.tsx";

const { Header } = Layout;

interface AppHeaderProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onNavigate: (page: NavigationPage) => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ 
  onToggleCollapse,
  onNavigate 
}) => {
  const { currentWorkspace } = useWorkspaceStore();
  const { layoutStyles, themeConfig } = useThemeStyles();

  //Header中的用户头像
  const adminMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: 'Personal Profile',
      icon: <UserOutlined />,
      onClick: () => onNavigate('profile')
    },
    {
      key: 'admin',
      label: 'Admin Panel', 
      icon: <SettingOutlined />,
      onClick: () => onNavigate('admin')
    },
    {
      key: 'settings',
      label: 'System Settings',
      icon: <SettingOutlined />,
      onClick: () => onNavigate('settings')
    },
    {
      type: 'divider'
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: () => console.log('Logout clicked'),
      danger: true
    }
  ];

  const titleStyle: React.CSSProperties = {
    fontSize: '18px',
    fontWeight: 600,
    margin: 0,
    color: themeConfig.themeMode === 'dark' ? '#ffffff' : '#1f2937'
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: '14px',
    margin: 0,
    lineHeight: '18px',
    color: themeConfig.themeMode === 'dark' ? '#8c8c8c' : '#4b5563'
  };

  return (
    <Header style={layoutStyles.header}>
      <Flex justify="space-between" align="center" style={{ height: '100%' }}>
        <Flex align="center" gap={16}>
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={onToggleCollapse}
            style={{
              fontSize: '16px',
              width: 40,
              height: 40,
            }}
          />
          <div>
            <Typography.Title level={4} style={{ ...titleStyle, marginBottom: '4px' }}>
              {currentWorkspace?.name}
            </Typography.Title>
            {currentWorkspace?.description && (
              <Typography.Text style={{ ...descriptionStyle, display: 'block' }}>
                {currentWorkspace?.description}
              </Typography.Text>
            )}
          </div>
        </Flex>
        
        <Dropdown 
          menu={{ items: adminMenuItems }} 
          trigger={['click']}
          placement="bottomRight"
        >
          <div className="admin-dropdown-trigger">
            <Space size={12} align="center">
              <UserAvatar name='Admin User' email = 'admin@company.com' />
            </Space>
          </div>
        </Dropdown>
      </Flex>
    </Header>
  );
};

export default AppHeader;
