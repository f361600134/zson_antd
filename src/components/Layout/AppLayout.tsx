import React, { useState } from 'react';
import { Layout, Menu, Dropdown, Avatar, Select, Typography, Space, Button, Flex } from 'antd';
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  DashboardOutlined,
  FileTextOutlined,
  TeamOutlined,
  BarChartOutlined,
  DownOutlined,
  CheckOutlined,
  BgColorsOutlined
} from '@ant-design/icons';
import { useWorkspaceStore } from '../../store/workspaceStore';
import { useThemeStore } from '../../store/themeStore';
import SystemSettings from '../Settings/SystemSettings';
import PersonalProfile from '../Profile/PersonalProfile';
import AdminPanel from '../Admin/AdminPanel';
import TeamManagement from '../Team/TeamManagement';
import type { MenuProps } from 'antd';

const { Sider, Header, Content } = Layout;
const { Text } = Typography;

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const { currentWorkspace, workspaces, setCurrentWorkspace } = useWorkspaceStore();
  const { themeConfig } = useThemeStore();

  const adminMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: 'Personal Profile',
      icon: <UserOutlined />,
      onClick: () => setCurrentPage('profile')
    },
    {
      key: 'admin',
      label: 'Admin Panel', 
      icon: <SettingOutlined />,
      onClick: () => setCurrentPage('admin')
    },
    {
      key: 'settings',
      label: 'System Settings',
      icon: <SettingOutlined />,
      onClick: () => setCurrentPage('settings')
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

  const sidebarMenuItems: MenuProps['items'] = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => setCurrentPage('dashboard')
    },
    {
      key: 'documents',
      icon: <FileTextOutlined />,
      label: 'Documents',
      onClick: () => setCurrentPage('documents')
    },
    {
      key: 'team',
      icon: <TeamOutlined />,
      label: 'Team Management',
      onClick: () => setCurrentPage('team')
    },
    {
      key: 'analytics',
      icon: <BarChartOutlined />,
      label: 'Analytics',
      onClick: () => setCurrentPage('analytics')
    }
  ];

  const workspaceOptions = workspaces.map(workspace => ({
    label: (
      <Flex justify="space-between" align="center" style={{ width: '100%' }}>
        <div>
          <div style={{ fontWeight: 500 }}>{workspace.name}</div>
          {workspace.description && (
            <div style={{ fontSize: '12px', color: '#8c8c8c' }}>{workspace.description}</div>
          )}
        </div>
        {currentWorkspace?.id === workspace.id && (
          <CheckOutlined style={{ color: '#1677ff' }} />
        )}
      </Flex>
    ),
    value: workspace.id,
    workspace: workspace
  }));

  const handleWorkspaceChange = (workspaceId: string) => {
    const workspace = workspaces.find(w => w.id === workspaceId);
    if (workspace) {
      setCurrentWorkspace(workspace);
    }
  };

  const siderStyle: React.CSSProperties = {
    backgroundColor: themeConfig.themeMode === 'dark' ? '#141414' : '#ffffff',
    borderRight: `1px solid ${themeConfig.themeMode === 'dark' ? '#303030' : '#e5e7eb'}`,
    ...(themeConfig.presetTheme === 'compact' && {
      background: 'linear-gradient(180deg, #FEFEFE 0%, #F8F9FA 100%)',
      borderRight: '1px solid #E5E7EB'
    }),
    ...(themeConfig.presetTheme === 'colorful' && {
      background: 'linear-gradient(180deg, #FAF9F7 0%, #F5F3F0 100%)',
      borderRight: '1px solid #E7E5E4'
    }),
    ...(themeConfig.presetTheme === 'luxury' && {
      background: 'linear-gradient(180deg, #1F1F1F 0%, #121212 100%)',
      borderRight: '1px solid #333333',
      boxShadow: 'inset 1px 0 0 rgba(255, 215, 0, 0.1)'
    })
  };

  const headerStyle: React.CSSProperties = {
    backgroundColor: themeConfig.themeMode === 'dark' ? '#141414' : '#ffffff',
    borderBottom: `1px solid ${themeConfig.themeMode === 'dark' ? '#303030' : '#e5e7eb'}`,
    padding: '0 24px',
    ...(themeConfig.presetTheme === 'compact' && {
      background: 'linear-gradient(135deg, #FEFEFE 0%, #F8F9FA 50%, #F1F3F4 100%)',
      borderBottom: '1px solid #E5E7EB',
      boxShadow: '0 2px 8px rgba(27, 77, 62, 0.06)'
    }),
    ...(themeConfig.presetTheme === 'colorful' && {
      background: 'linear-gradient(135deg, #FAF9F7 0%, #F5F3F0 50%, #F0EDE8 100%)',
      borderBottom: '1px solid #E7E5E4',
      boxShadow: '0 2px 8px rgba(139, 90, 107, 0.06)'
    }),
    ...(themeConfig.presetTheme === 'luxury' && {
      background: 'linear-gradient(135deg, #1F1F1F 0%, #2A2A2A 50%, #1A1A1A 100%)',
      borderBottom: '1px solid #333333',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 215, 0, 0.1)'
    })
  };

  const contentStyle: React.CSSProperties = {
    backgroundColor: themeConfig.themeMode === 'dark' ? '#000000' : '#f5f5f5',
    padding: '24px',
    ...(themeConfig.presetTheme === 'compact' && {
      background: 'linear-gradient(135deg, #FEFEFE 0%, #F8F9FA 100%)',
      position: 'relative'
    }),
    ...(themeConfig.presetTheme === 'colorful' && {
      background: 'linear-gradient(135deg, #FAF9F7 0%, #F5F3F0 100%)',
      position: 'relative'
    }),
    ...(themeConfig.presetTheme === 'luxury' && {
      background: 'linear-gradient(135deg, #121212 0%, #1A1A1A 100%)',
      position: 'relative'
    })
  };

  const layoutStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: themeConfig.themeMode === 'dark' ? '#000000' : '#f5f5f5'
  };

  const workspaceSectionStyle: React.CSSProperties = {
    padding: '16px',
    borderBottom: `1px solid ${themeConfig.themeMode === 'dark' ? '#303030' : '#e5e7eb'}`
  };

  const workspaceLabelStyle: React.CSSProperties = {
    fontSize: '12px',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '8px',
    display: 'block',
    color: themeConfig.themeMode === 'dark' ? '#8c8c8c' : '#6b7280'
  };

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

  return (
    <Layout style={layoutStyle}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={280}
        style={siderStyle}
      >
        <div style={workspaceSectionStyle}>
          {!collapsed ? (
            <div>
              <Text style={workspaceLabelStyle}>
                Workspace
              </Text>
              <Select
                value={currentWorkspace?.id}
                onChange={handleWorkspaceChange}
                style={{ width: '100%' }}
                placeholder="Select workspace"
                optionLabelProp="label"
                suffixIcon={<DownOutlined />}
                className="workspace-selector"
              >
                {workspaceOptions.map(option => (
                  <Select.Option 
                    key={option.value} 
                    value={option.value}
                    label={option.workspace.name}
                  >
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
            </div>
          ) : (
            <Flex justify="center">
              <Button 
                type="text" 
                icon={<DashboardOutlined />}
                style={{ width: '100%' }}
              />
            </Flex>
          )}
        </div>
        
        <Menu
          mode="inline"
          selectedKeys={[currentPage]}
          items={sidebarMenuItems}
          style={{ border: 'none', paddingTop: '16px' }}
        />
      </Sider>

      <Layout>
        <Header style={headerStyle}>
          <Flex justify="space-between" align="center" style={{ height: '100%' }}>
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

        <Content style={contentStyle}>
          {/* 知识协作主题背景装饰 */}
          {themeConfig.presetTheme === 'compact' && (
            <>
              <div className="knowledge-bg-pattern" />
              <div className="knowledge-floating-icons">
                <div className="floating-book">📚</div>
                <div className="floating-lightbulb">💡</div>
                <div className="floating-tree">🌱</div>
              </div>
            </>
          )}
          
          {/* 桃花缘主题背景装饰 */}
          {themeConfig.presetTheme === 'colorful' && (
            <>
              <div className="elegant-bg-pattern" />
              <div className="elegant-floating-elements">
                <div className="floating-element element-1">✦</div>
                <div className="floating-element element-2">◆</div>
                <div className="floating-element element-3">✧</div>
                <div className="floating-accent">◇</div>
              </div>
            </>
          )}
          
          {/* 黑金主题背景装饰 */}
          {themeConfig.presetTheme === 'luxury' && (
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
          )}
          
          {currentPage === 'dashboard' && children}
          {currentPage === 'settings' && <SystemSettings />}
          {currentPage === 'profile' && <PersonalProfile />}
          {currentPage === 'admin' && <AdminPanel />}
          {currentPage === 'team' && <TeamManagement />}
          {currentPage === 'documents' && (
            <div style={placeholderStyle}>
              <FileTextOutlined style={placeholderIconStyle} />
              <h3 style={placeholderTitleStyle}>
                Documents Page
              </h3>
              <p style={placeholderTextStyle}>
                This page is under development
              </p>
            </div>
          )}
          {currentPage === 'analytics' && (
            <div style={placeholderStyle}>
              <BarChartOutlined style={placeholderIconStyle} />
              <h3 style={placeholderTitleStyle}>
                Analytics Page
              </h3>
              <p style={placeholderTextStyle}>
                This page is under development
              </p>
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;