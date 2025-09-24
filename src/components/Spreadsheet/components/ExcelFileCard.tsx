import React from 'react';
import {Card, Typography, Tag, Tooltip, Space, Button} from 'antd';
import { FileExcelOutlined, CalendarOutlined } from '@ant-design/icons';
import type { ExcelFile } from '../types';
import { FILE_CARD_STYLE, FILE_CARD_HOVER_STYLE } from '../constants';
import FileActionMenu from './FileActionMenu';
import {removeFileExtension, formatFileSize, getBranchColor} from "../utils.ts";

const { Text, Paragraph } = Typography;

interface ExcelFileCardProps {
  file: ExcelFile;
  onAction: (action: string, fileName: string) => void;
}

const ExcelFileCard: React.FC<ExcelFileCardProps> = ({ file, onAction }) => {
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
      {/*<div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>*/}
      {/*  /!* ICon *!/*/}
      {/*  <div style={{ textAlign: 'center', marginBottom: '12px' }}>*/}
      {/*    <FileExcelOutlined style={{ fontSize: '20px', color: '#52c41a' }} />*/}
      {/*  </div>*/}

      {/*  /!* File name *!/*/}
      {/*  <div style={{ flex: 1 }}>*/}
      {/*    <Text strong style={{*/}
      {/*      // display: 'block',*/}
      {/*      // marginBottom: '8px',*/}
      {/*      fontSize: '12px',*/}
      {/*      // lineHeight: '20px',*/}
      {/*      // //height: '40px',*/}
      {/*      // overflow: 'hidden'*/}
      {/*    }}*/}
      {/*      ellipsis={{tooltip:file.name}}*/}
      {/*    >*/}
      {/*      {file.name}*/}
      {/*    </Text>*/}

      {/*    <div style={{ fontSize: '12px', color: '#8c8c8c' }}>*/}
      {/*      <div style={{ marginBottom: '4px' }}>*/}
      {/*        <CalendarOutlined style={{ marginRight: '4px' }} />*/}
      {/*        {file.updateTime.split(' ')[0]}*/}
      {/*      </div>*/}
      {/*      <div style={{*/}
      {/*        display: 'flex',*/}
      {/*        justifyContent: 'space-between',*/}
      {/*        alignItems: 'center'*/}
      {/*      }}>*/}
      {/*        <Tag color={getBranchColor(file.branch)}>*/}
      {/*          {file.branch}*/}
      {/*        </Tag>*/}
      {/*        <Text style={{ fontSize: '12px', color: '#8c8c8c' }}>*/}
      {/*          {file.size}*/}
      {/*        </Text>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*<FileActionMenu file={file} onAction={onAction} />*/}


      {/* 文件头部 - 图标和操作菜单 */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '12px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{
            // width: '32px',
            // height: '32px',
            // borderRadius: '8px',
            // background: 'linear-gradient(135deg, #f6ffed 0%, #f0fff3 100%)',
            // display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <FileExcelOutlined style={{
              fontSize: '16px',
              color: '#52c41a'
            }} />
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
                //lineHeight: '1',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                minHeight: '40px'
              }}
              ellipsis={{ rows: 2 }}
          >
            {removeFileExtension(file.name)}
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
          {/*<CalendarOutlined />*/}
          {/*<Text style={{ fontSize: '12px', color: '#6b7280' }}>*/}
          {/*  {file.updateTime.split(' ')[0]}*/}
          {/*</Text>*/}
          {/*<CalendarOutlined style={{ marginRight: '4px' }} />*/}
          {/*{file.updateTime}*/}

          <div style={{ fontSize: '10px', color: '#8c8c8c' }}>
            <div style={{ marginBottom: '4px' }}>
              {/*<CalendarOutlined style={{ marginRight: '4px' }} />*/}
              {file.updateTime}
            </div>
          </div>

        </div>

        {/* 分支和大小信息 */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '4px'
        }}>
          {/*<Tag*/}
          {/*    color={getBranchColor(file.branch)}*/}
          {/*    style={{*/}
          {/*      margin: 0,*/}
          {/*      fontSize: '11px',*/}
          {/*      padding: '2px 6px',*/}
          {/*      borderRadius: '4px',*/}
          {/*      lineHeight: '1.2'*/}
          {/*    }}*/}
          {/*>*/}
          {/*  {file.branch}*/}
          {/*</Tag>*/}

          {/*<Text style={{*/}
          {/*  fontSize: '11px',*/}
          {/*  color: '#9ca3af',*/}
          {/*  fontWeight: 500*/}
          {/*}}>*/}
          {/*  {formatFileSize(file.size)}*/}
          {/*</Text>*/}
        </div>
      </Space>

    </Card>
    </Tooltip>
  );
};

export default ExcelFileCard;
