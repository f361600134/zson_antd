// components/UserAvatar/UserAvatar.tsx
import React from 'react';
import { Avatar, Space, Typography } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { useThemeStyles } from '../../hooks';

interface UserAvatarProps {
    name: string;
    email: string;
    showDropdown?: boolean;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ name, email, showDropdown = true }) => {
    const { themeConfig } = useThemeStyles();

    return (
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
                    {name}
                </Typography.Text>
                <Typography.Text
                    style={{
                        fontSize: '12px',
                        color: themeConfig.themeMode === 'dark' ? '#8c8c8c' : '#6b7280',
                        display: 'block',
                        lineHeight: '16px'
                    }}
                >
                    {email}
                </Typography.Text>
            </div>
            {showDropdown && (
                <DownOutlined
                    style={{ color: themeConfig.themeMode === 'dark' ? '#8c8c8c' : '#9ca3af' }}
                />
            )}
        </Space>
    );
};

export default UserAvatar;