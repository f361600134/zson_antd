import React from 'react';
import { Layout, Dropdown, Avatar, Typography, Space, Flex, Button } from 'antd';
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  DownOutlined,
  MenuOutlined
} from '@ant-design/icons';
import { useWorkspaceStore } from '../../store/workspaceStore';
import { useThemeStyles } from '../../hooks';
import type { MenuProps } from 'antd';
import type { NavigationPage } from '../../types';

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
              <Avatar 
                size="default" 
                icon={<UserOutlined />}
                style={{ backgroundColor: '#1677ff' }}
              />
              <div style={{ textAlign: 'left' }}>
                <Typography.Text 
                  style={{ 
                    fontWeight: 500,
                    color: themeConfig.themeMode === 'dark' ? '#ffffff' : '#1f2937',
                    display: 'block',
                    lineHeight: '20px',
                    marginBottom: '2px'
                  }}
                >
                  Admin User
                </Typography.Text>
                <Typography.Text 
                  style={{ 
                    fontSize: '12px',
                    color: themeConfig.themeMode === 'dark' ? '#8c8c8c' : '#6b7280',
                    display: 'block',
                    lineHeight: '16px',
                    marginTop: 0
                  }}
                >
                  admin@company.com
                </Typography.Text>
              </div>
              <DownOutlined 
                style={{ color: themeConfig.themeMode === 'dark' ? '#8c8c8c' : '#9ca3af' }}
              />
            </Space>
          </div>
        </Dropdown>
      </Flex>
    </Header>
  );
};

export default AppHeader;
