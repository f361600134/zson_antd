import React from 'react';
import { Card, Typography, Tag, Tooltip } from 'antd';
import { FileTextOutlined, CalendarOutlined } from '@ant-design/icons';
import type { JsonFile } from '../types';
import { truncateFileName, getBranchColor, getJsonTypeColor } from '../utils';
import { FILE_CARD_STYLE, FILE_CARD_HOVER_STYLE } from '../constants';
import FileActionMenu from './FileActionMenu';

const { Text } = Typography;

interface JsonFileCardProps {
  file: JsonFile;
  onAction: (action: string, fileName: string) => void;
}

const JsonFileCard: React.FC<JsonFileCardProps> = ({ file, onAction }) => {
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
      <Tooltip title={file.name} placement={"bottom"}>
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
        <div style={{  marginBottom: '12px' }}>
          <FileTextOutlined style={{ fontSize: '16px', color: '#1677ff' }} />
        </div>

        <div style={{ flex: 1 }}>

            <Text strong style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              lineHeight: '20px',
              // height: '40px',
              overflow: 'hidden'
            }}>
              {truncateFileName(file.name)}
            </Text>

          <div style={{ fontSize: '10px', color: '#8c8c8c' }}>
            <div style={{ marginBottom: '4px' }}>
              {/*<CalendarOutlined style={{ marginRight: '4px' }} />*/}
              {/*{file.updateTime.split(' ')[0]}*/}
              {file.updateTime}
            </div>
          </div>
        </div>
      </div>

      <FileActionMenu file={file} onAction={onAction} />
    </Card>
      </Tooltip>
  );
};

export default JsonFileCard;
