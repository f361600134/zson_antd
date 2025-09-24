import React from 'react';
import { Button, Dropdown } from 'antd';
import { 
  EyeOutlined, 
  DownloadOutlined, 
  DeleteOutlined, 
  MoreOutlined 
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import type { FileActionMenuProps } from '../types';

const FileActionMenu: React.FC<FileActionMenuProps> = ({ file, onAction }) => {
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

  return (
    <div
      className="file-actions"
      style={{
        position: 'absolute',
        top: '8px',
        right: '8px',
        opacity: 0,
        transition: 'opacity 0.3s ease'
      }}
    >
      <Dropdown 
        menu={{ items: menuItems }} 
        trigger={['click']}
        placement="bottomRight"
      >
        <Button
          type="text"
          icon={<MoreOutlined />}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
          }}
        />
      </Dropdown>
    </div>
  );
};

export default FileActionMenu;
