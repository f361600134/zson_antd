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
