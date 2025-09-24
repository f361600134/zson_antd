import React from 'react';
import { Card, Typography, Tag, Tooltip } from 'antd';
import { FileExcelOutlined, CalendarOutlined } from '@ant-design/icons';
import type { ExcelFile } from '../types';
import { truncateFileName, getBranchColor } from '../utils';
import { FILE_CARD_STYLE, FILE_CARD_HOVER_STYLE } from '../constants';
import FileActionMenu from './FileActionMenu';

const { Text } = Typography;

interface ExcelFileCardProps {
  file: ExcelFile;
  onAction: (action: string, fileName: string) => void;
}

const ExcelFileCard: React.FC<ExcelFileCardProps> = ({ file, onAction }) => {
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    Object.assign(card.style, FILE_CARD_HOVER_STYLE);
    const actions = card.querySelector('.file-actions') as HTMLElement;
    if (actions) actions.style.opacity = '1';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'scale(1)';
    card.style.boxShadow = '';
    const actions = card.querySelector('.file-actions') as HTMLElement;
    if (actions) actions.style.opacity = '0';
  };

  return (
    <Card
      style={FILE_CARD_STYLE}
      bodyStyle={{ 
        padding: '16px', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column' 
      }}
      className="file-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ textAlign: 'center', marginBottom: '12px' }}>
          <FileExcelOutlined style={{ fontSize: '48px', color: '#52c41a' }} />
        </div>

        <div style={{ flex: 1 }}>
          <Tooltip title={file.name}>
            <Text strong style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              lineHeight: '20px',
              height: '40px',
              overflow: 'hidden'
            }}>
              {truncateFileName(file.name)}
            </Text>
          </Tooltip>

          <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
            <div style={{ marginBottom: '4px' }}>
              <CalendarOutlined style={{ marginRight: '4px' }} />
              {file.updateTime.split(' ')[0]}
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Tag color={getBranchColor(file.branch)}>
                {file.branch}
              </Tag>
              <Text style={{ fontSize: '12px', color: '#8c8c8c' }}>
                {file.size}
              </Text>
            </div>
          </div>
        </div>
      </div>

      <FileActionMenu file={file} onAction={onAction} />
    </Card>
  );
};

export default ExcelFileCard;
