import {
    DashboardOutlined,
    FileTextOutlined,
    TeamOutlined,
    BarChartOutlined,
} from '@ant-design/icons';

import {NavigationMenuItem} from "../../types/navigation.ts";

//侧边栏导航
export const sidebarNavigationItems: NavigationMenuItem[] = [
    {
        key: 'dashboard',
        icon: <DashboardOutlined />,
        label: 'Dashboard',
    },
    {
        key: 'documents',
        icon: <FileTextOutlined />,
        label: 'Documents',
    },
    {
        key: 'team',
        icon: <TeamOutlined />,
        label: 'Team Management',
    },
    {
        key: 'analytics',
        icon: <BarChartOutlined />,
        label: 'Analytics',
    },
];

// //用户导航
// export const userNavigationItems: NavigationMenuItem[] = [
//     { key: 'profile', label: 'Personal Profile', icon: <UserOutlined /> },
//     { key: 'admin', label: 'Admin Panel', icon: <SettingOutlined />},
//     { key: 'settings', label: 'System Settings', icon: <SettingOutlined />},
//     { type: 'divider' },
//     { key: 'logout', label: 'Logout', icon: <LogoutOutlined />, danger: true }
// ];
//
//
//
// //管理员导航
// export const getAdminMenuItems = (onNavigate: (page: NavigationPage) => void): MenuProps['items'] => [
//     { key: 'profile', label: 'Personal Profile', icon: <UserOutlined />, onClick: () => onNavigate('profile') },
//     { key: 'admin', label: 'Admin Panel', icon: <SettingOutlined />, onClick: () => onNavigate('admin') },
//     { key: 'settings', label: 'System Settings', icon: <SettingOutlined />, onClick: () => onNavigate('settings') },
//     { type: 'divider' },
//     { key: 'logout', label: 'Logout', icon: <LogoutOutlined />, onClick: () => console.log('Logout'), danger: true }
// ];
