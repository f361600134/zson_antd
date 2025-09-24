import React from 'react';
import { Input, Select, Button, Space } from 'antd';
import {
  SearchOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  BranchesOutlined
} from '@ant-design/icons';
import type { ViewMode, FilterOptions } from '../types';
import { BRANCHES } from '../constants';

interface FileToolbarProps {
  filterOptions: FilterOptions;
  viewMode: ViewMode;
  onFilterChange: (options: Partial<FilterOptions>) => void;
  onViewModeChange: (mode: ViewMode) => void;
}

const FileToolbar: React.FC<FileToolbarProps> = ({
  filterOptions,
  viewMode,
  onFilterChange,
  onViewModeChange
}) => {
  return (
    <div style={{
      marginBottom: '16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '12px'
    }}>
      <Space>
        <Input
          placeholder="搜索文件名..."
          prefix={<SearchOutlined />}
          value={filterOptions.searchText}
          onChange={(e) => onFilterChange({ searchText: e.target.value })}
          style={{ width: '250px' }}
          allowClear
        />
        <Select
          value={filterOptions.selectedBranch}
          onChange={(value) => onFilterChange({ selectedBranch: value })}
          style={{ width: '150px' }}
          placeholder="选择分支"
        >
          <Select.Option value="all">
            <BranchesOutlined style={{ marginRight: '4px' }} />
            所有分支
          </Select.Option>
          {BRANCHES.filter(b => b !== 'all').map(branch => (
            <Select.Option key={branch} value={branch}>
              <BranchesOutlined style={{ marginRight: '4px' }} />
              {branch}
            </Select.Option>
          ))}
        </Select>
      </Space>

      <Space>
        <Button.Group>
          <Button
            type={viewMode === 'grid' ? 'primary' : 'default'}
            icon={<AppstoreOutlined />}
            onClick={() => onViewModeChange('grid')}
          >
            网格
          </Button>
          <Button
            type={viewMode === 'list' ? 'primary' : 'default'}
            icon={<UnorderedListOutlined />}
            onClick={() => onViewModeChange('list')}
          >
            列表
          </Button>
        </Button.Group>
      </Space>
    </div>
  );
};

export default FileToolbar;
