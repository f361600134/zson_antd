import React, {ReactNode} from 'react';
import {Card, Typography, Tag, Tooltip, Space, Button} from 'antd';
import { FileExcelOutlined, CalendarOutlined } from '@ant-design/icons';
import type { ExcelFile } from '../types';
import { FILE_CARD_STYLE, FILE_CARD_HOVER_STYLE } from '../constants';
import FileActionMenu from './FileActionMenu';
import {removeFileExtension, formatFileSize, getBranchColor} from "../utils.ts";

const { Text, Paragraph } = Typography;

interface FileCardProps {
  file: ExcelFile;
  icon: ReactNode,
  onAction: (action: string, fileName: string) => void;
}

const FileCard: React.FC<FileCardProps> = ({ file, icon, onAction }) => {
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    Object.assign(card.style, FILE_CARD_HOVER_STYLE);
    card.style.borderColor = '#f0f0f0';
    const actions = card.querySelector('.file-actions') as HTMLElement;
    if (actions) actions.style.opacity = '1';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'scale(1)';
    card.style.boxShadow = '';
    card.style.borderColor = '';
    const actions = card.querySelector('.file-actions') as HTMLElement;
    if (actions) actions.style.opacity = '0';
  };

  return (
      <Tooltip title={file.name} placement="bottom">
    <Card
      style={FILE_CARD_STYLE}
      bodyStyle={{
        padding: '16px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 文件头部 - 图标和操作菜单 */}
      <div style={{display: 'flex',justifyContent: 'space-between',alignItems: 'flex-start',marginBottom: '12px'}}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {icon}
          </div>
        </div>
        <FileActionMenu file={file} onAction={onAction} />
      </div>

      {/* 文件主要内容区域 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* 文件名 */}
        <Paragraph
            strong
            style={{
              margin: 0,
              fontSize: '12px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '40px'
            }}
            ellipsis={{ rows: 2 }}
        >
            {(file.name)}
          </Paragraph>
      </div>

      {/* 文件信息 */}
      <Space direction="vertical" size={4} style={{ width: '100%' }}>
        {/* 更新时间 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '12px',
          color: '#6b7280'
        }}>
          <div style={{ fontSize: '10px', color: '#8c8c8c' }}>
            <div style={{ marginBottom: '4px' }}>
              {/*<CalendarOutlined style={{ marginRight: '4px' }} />*/}
              {file.updateTime}
            </div>
          </div>
        </div>
      </Space>

    </Card>
    </Tooltip>
  );
};

export default FileCard;
