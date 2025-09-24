import React from 'react';
import { Button, Dropdown, theme } from 'antd';
import { 
  EyeOutlined, 
  DownloadOutlined, 
  DeleteOutlined, 
  MoreOutlined 
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import type { FileActionMenuProps } from '../types';
import { useThemeStore } from '../../../store/themeStore';

const FileActionMenu: React.FC<FileActionMenuProps> = ({ file, onAction }) => {
  const { token } = theme.useToken();
  const { themeConfig } = useThemeStore();

  const menuItems: MenuProps['items'] = [
    {
      key: 'view',
      label: '查看',
      icon: <EyeOutlined />,
      onClick: () => onAction('view', file.name)
    },
    {
      key: 'download',
      label: '下载',
      icon: <DownloadOutlined />,
      onClick: () => onAction('download', file.name)
    },
    {
      type: 'divider'
    },
    {
      key: 'delete',
      label: '删除',
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => onAction('delete', file.name)
    }
  ];

  // 根据主题模式动态调整按钮样式
  const buttonStyle: React.CSSProperties = {
    backgroundColor: themeConfig.themeMode === 'dark' 
      ? 'rgba(255, 255, 255, 0.04)' 
      : 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(8px)',
    boxShadow: themeConfig.themeMode === 'dark'
      ? '0 2px 8px rgba(0, 0, 0, 0.3)'
      : '0 2px 8px rgba(0, 0, 0, 0.1)',
    border: themeConfig.themeMode === 'dark'
      ? `1px solid ${token.colorBorderSecondary}`
      : 'none',
    color: themeConfig.themeMode === 'dark'
      ? token.colorText
      : token.colorTextSecondary
  };

  return (
    <div
      className="file-actions"
      style={{
        position: 'absolute',
        top: '8px',
        right: '8px',
        opacity: 0,
        transition: 'opacity 0.3s ease',
        zIndex: 10
      }}
    >
      <Dropdown 
        menu={{ items: menuItems }} 
        trigger={['click']}
        placement="bottomRight"
        overlayStyle={{
          minWidth: '120px'
        }}
      >
        <Button
          type="text"
          icon={<MoreOutlined />}
          size="small"
          style={buttonStyle}
          className="file-action-button"
        />
      </Dropdown>
    </div>
  );
};

export default FileActionMenu;
