import React, { useMemo } from 'react';
import { Layout, Menu, Select, Typography, Button, Flex } from 'antd';
import {
  DashboardOutlined,
  DownOutlined
} from '@ant-design/icons';
import { useWorkspaceStore } from '../../store/workspaceStore';
import { useThemeStyles } from '../../hooks';
import { usePageRouter } from '../../hooks/usePageRouter';
import type { MenuProps } from 'antd';
import type { NavigationPage } from '../../types';
import { sidebarNavigationItems } from "./NavigationItems.tsx";

const { Sider } = Layout;
const { Text } = Typography;

interface SidebarProps {
  collapsed: boolean;
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  userRoles?: string[];
}

const Sidebar: React.FC<SidebarProps> = ({ 
  collapsed, 
  currentPage, 
  onNavigate,
  userRoles = []
}) => {
  const { currentWorkspace, workspaces, setCurrentWorkspace } = useWorkspaceStore();
  const { layoutStyles, themeConfig } = useThemeStyles();
  const { canAccess } = usePageRouter({ userRoles });

  // 根据用户角色过滤菜单项
  const filteredNavigationItems = useMemo(() => {
    return sidebarNavigationItems.filter(item => {
      // 如果菜单项定义了角色要求，检查用户是否有权限
      if (item.roles && item.roles.length > 0) {
        return item.roles.some(role => userRoles.includes(role));
      }
      
      // 如果没有角色要求，检查对应页面的权限
      return canAccess(item.key as NavigationPage);
    });
  }, [sidebarNavigationItems, userRoles, canAccess]);

  const sidebarMenuItems: MenuProps['items'] = filteredNavigationItems.map(item => ({
    key: item.key,
    icon: item.icon,
    label: item.label,
    onClick: () => onNavigate(item.key as NavigationPage)
  }));

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
          <DashboardOutlined style={{ color: '#1677ff' }} />
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

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      width={280}
      style={layoutStyles.sider}
      trigger={null}
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
  );
};

export default Sidebar;