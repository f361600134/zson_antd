import { Table, Tag, Button, Tooltip, Space, Typography } from 'antd';
import '../styles/FileTableView.css';
import type { ColumnsType } from 'antd/es/table';
import {
  FileExcelOutlined,
  FileTextOutlined,
  EyeOutlined,
  DownloadOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import type { ExcelFile, JsonFile } from '../types';
import { getBranchColor, getJsonTypeColor } from '../utils';
import dayjs from 'dayjs';

const { Text } = Typography;

interface FileTableViewProps<T extends ExcelFile | JsonFile> {
  files: T[];
  fileType: 'excel' | 'json';
  loading?: boolean;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    showSizeChanger?: boolean;
    showQuickJumper?: boolean;
    showTotal?: (total: number, range: [number, number]) => string;
    onChange?: (page: number, pageSize: number) => void;
  };
  onAction: (action: string, fileName: string) => void;
}

function FileTableView<T extends ExcelFile | JsonFile>({
  files,
  fileType,
  loading = false,
  pagination,
  onAction
}: FileTableViewProps<T>) {
  
  const getFileIcon = (record: T) => {
    if (fileType === 'excel') {
      return <FileExcelOutlined style={{ color: '#52c41a', fontSize: '16px' }} />;
    } else {
      return <FileTextOutlined style={{ color: '#1677ff', fontSize: '16px' }} />;
    }
  };

  const getFileTypeTag = (record: T) => {
    if (fileType === 'json') {
      const jsonFile = record as JsonFile;
      return (
        <Tag color={getJsonTypeColor(jsonFile.type)}>
          {jsonFile.type}
        </Tag>
      );
    }
    return null;
  };

  const formatFileSize = (size: string) => {
    return (
      <Text type="secondary" style={{ fontSize: '13px' }}>
        {size}
      </Text>
    );
  };

  const formatTime = (time: string) => {
    const isToday = dayjs(time).isSame(dayjs(), 'day');
    const isYesterday = dayjs(time).isSame(dayjs().subtract(1, 'day'), 'day');
    
    let displayTime: string;
    if (isToday) {
      displayTime = `今天 ${dayjs(time).format('HH:mm')}`;
    } else if (isYesterday) {
      displayTime = `昨天 ${dayjs(time).format('HH:mm')}`;
    } else {
      displayTime = dayjs(time).format('MM-DD HH:mm');
    }
    
    return (
      <Tooltip title={time}>
        <Text style={{ fontSize: '13px' }}>
          {displayTime}
        </Text>
      </Tooltip>
    );
  };

  const getActionButtons = (record: T) => (
    <Space size="small">
      <Tooltip title="查看">
        <Button
          type="text"
          size="small"
          icon={<EyeOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            onAction('view', record.name);
          }}
        />
      </Tooltip>
      <Tooltip title="下载">
        <Button
          type="text"
          size="small"
          icon={<DownloadOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            onAction('download', record.name);
          }}
        />
      </Tooltip>
      <Tooltip title="删除">
        <Button
          type="text"
          size="small"
          icon={<DeleteOutlined />}
          danger
          onClick={(e) => {
            e.stopPropagation();
            onAction('delete', record.name);
          }}
        />
      </Tooltip>
    </Space>
  );

  const columns: ColumnsType<T> = [
    {
      title: '文件名',
      dataIndex: 'name',
      key: 'name',
      width: '40%',
      ellipsis: {
        showTitle: false,
      },
      render: (name: string, record: T) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {getFileIcon(record)}
          <div style={{ flex: 1, minWidth: 0 }}>
            <Tooltip title={name}>
              <Text
                strong
                style={{ 
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'block',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
                onClick={() => onAction('view', name)}
              >
                {name}
              </Text>
            </Tooltip>
            <div style={{ marginTop: '2px' }}>
              <Tag color={getBranchColor(record.branch)}>
                {record.branch}
              </Tag>
              {getFileTypeTag(record)}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '最后更新',
      dataIndex: 'updateTime',
      key: 'updateTime',
      width: '20%',
      sorter: (a, b) => dayjs(a.updateTime).unix() - dayjs(b.updateTime).unix(),
      render: formatTime,
    },
    {
      title: '文件大小',
      dataIndex: 'size',
      key: 'size',
      width: '15%',
      sorter: (a, b) => {
        // 简单的文件大小排序（实际项目中应该转换为字节进行比较）
        const getBytes = (size: string) => {
          const num = parseFloat(size);
          if (size.includes('GB')) return num * 1024 * 1024 * 1024;
          if (size.includes('MB')) return num * 1024 * 1024;
          if (size.includes('KB')) return num * 1024;
          return num;
        };
        return getBytes(a.size) - getBytes(b.size);
      },
      render: formatFileSize,
    },
    {
      title: '操作',
      key: 'actions',
      width: '25%',
      render: (_, record) => getActionButtons(record),
    },
  ];

  const defaultPagination = {
    current: 1,
    pageSize: 10,
    total: files.length,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number, range: [number, number]) =>
      `显示 ${range[0]}-${range[1]} 条，共 ${total} 条`,
    pageSizeOptions: ['10', '20', '50', '100'],
    ...pagination,
  };

  return (
    <Table<T>
      columns={columns}
      dataSource={files}
      rowKey="id"
      loading={loading}
      pagination={defaultPagination}
      size="middle"
      scroll={{ x: 800 }}
      rowClassName="file-table-row"
      style={{
        backgroundColor: 'var(--ant-color-bg-container)',
      }}
      onRow={(record) => ({
        style: {
          cursor: 'pointer',
        },
        onClick: () => onAction('view', record.name),
      })}
    />
  );
}

export default FileTableView;
