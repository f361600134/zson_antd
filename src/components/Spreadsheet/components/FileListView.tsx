import { List, Avatar, Button, Tooltip, Typography, Space, Tag } from 'antd';
import {
  FileExcelOutlined,
  FileTextOutlined,
  EyeOutlined,
  DownloadOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import type { ExcelFile, JsonFile } from '../types';
import { getBranchColor, getJsonTypeColor } from '../utils';

const { Text } = Typography;

interface FileListViewProps<T extends ExcelFile | JsonFile> {
  files: T[];
  fileType: 'excel' | 'json';
  onAction: (action: string, fileName: string) => void;
}

function FileListView<T extends ExcelFile | JsonFile>({ 
  files, 
  fileType, 
  onAction 
}: FileListViewProps<T>) {
  const getAvatar = (file: T) => {
    if (fileType === 'excel') {
      return <Avatar icon={<FileExcelOutlined />} style={{ backgroundColor: '#52c41a' }} />;
    } else {
      return <Avatar icon={<FileTextOutlined />} style={{ backgroundColor: '#1677ff' }} />;
    }
  };

  const getTitle = (file: T) => {
    const tags = [
      <Tag key="branch" color={getBranchColor(file.branch)}>
        {file.branch}
      </Tag>
    ];

    // 如果是 JSON 文件，添加类型标签
    if (fileType === 'json') {
      const jsonFile = file as JsonFile;
      tags.push(
        <Tag key="type" color={getJsonTypeColor(jsonFile.type)}>
          {jsonFile.type}
        </Tag>
      );
    }

    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Text strong>{file.name}</Text>
        {tags}
      </div>
    );
  };

  const getDescription = (file: T) => (
    <Space direction="vertical" size={4}>
      <Text type="secondary">创建时间: {file.createTime}</Text>
      <Text type="secondary">更新时间: {file.updateTime}</Text>
      <Text type="secondary">文件大小: {file.size}</Text>
    </Space>
  );

  const getActions = (file: T) => [
    <Tooltip key="view" title="查看">
      <Button
        type="text"
        icon={<EyeOutlined />}
        onClick={() => onAction('view', file.name)}
      />
    </Tooltip>,
    <Tooltip key="download" title="下载">
      <Button
        type="text"
        icon={<DownloadOutlined />}
        onClick={() => onAction('download', file.name)}
      />
    </Tooltip>,
    <Tooltip key="delete" title="删除">
      <Button
        type="text"
        icon={<DeleteOutlined />}
        danger
        onClick={() => onAction('delete', file.name)}
      />
    </Tooltip>
  ];

  return (
    <List
      dataSource={files}
      renderItem={(file) => (
        <List.Item actions={getActions(file)}>
          <List.Item.Meta
            avatar={getAvatar(file)}
            title={getTitle(file)}
            description={getDescription(file)}
          />
        </List.Item>
      )}
    />
  );
}

export default FileListView;
