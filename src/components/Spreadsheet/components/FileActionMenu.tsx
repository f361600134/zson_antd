import React from 'react';
import {Button, Dropdown} from 'antd';
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
      key: 'download',
      label: '下载',
      icon: <DownloadOutlined />,
      onClick: () => onAction('download', file.name)
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
        transition: 'opacity 0.3s ease',
        zIndex: 10
      }}
    >
      {/* 预览按钮，默认隐藏，通过父级CSS控制显示 */}
        <Button
            type="text"
            icon={<EyeOutlined />}
            // onClick={handlePreviewClick}
            size="small"
        />

      <Dropdown
        menu={{ items: menuItems }} 
        trigger={['click']}
        placement="bottomRight"
      >
        <Button
          type="text"
          icon={<MoreOutlined />}
          size="small"
        />
      </Dropdown>
    </div>
  );
};

export default FileActionMenu;
