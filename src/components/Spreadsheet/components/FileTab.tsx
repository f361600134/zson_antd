import { useEffect } from 'react';
import { Empty } from 'antd';
import type { ExcelFile, JsonFile, ViewMode, FilterOptions } from '../types';
import { usePagination } from '../hooks/usePagination';
import FileToolbar from './FileToolbar';
import FileGridView from './FileGridView';
import FileTableView from './FileTableView';

interface FileTabProps<T extends ExcelFile | JsonFile> {
  files: T[];
  fileType: 'excel' | 'json';
  filterOptions: FilterOptions;
  viewMode: ViewMode;
  emptyDescription: string;
  onFilterChange: (options: Partial<FilterOptions>) => void;
  onViewModeChange: (mode: ViewMode) => void;
  onAction: (action: string, fileName: string) => void;
}

function FileTab<T extends ExcelFile | JsonFile>({
  files,
  fileType,
  filterOptions,
  viewMode,
  emptyDescription,
  onFilterChange,
  onViewModeChange,
  onAction
}: FileTabProps<T>) {
  const {
    getPaginatedData,
    getPaginationConfig,
    resetPagination
  } = usePagination(10);

  // 当筛选条件改变时重置分页
  useEffect(() => {
    resetPagination();
  }, [filterOptions, resetPagination]);

  const paginatedFiles = viewMode === 'list' ? getPaginatedData(files) : files;
  const paginationConfig = getPaginationConfig(files.length);

  return (
    <>
      <FileToolbar
        filterOptions={filterOptions}
        viewMode={viewMode}
        onFilterChange={onFilterChange}
        onViewModeChange={onViewModeChange}
      />

      {files.length === 0 ? (
        <Empty 
          description={emptyDescription}
          style={{ margin: '40px 0' }}
        />
      ) : (
        <>
          {viewMode === 'grid' ? (
            <FileGridView 
              files={files} 
              fileType={fileType} 
              onAction={onAction} 
            />
          ) : (
            <FileTableView
              files={paginatedFiles}
              fileType={fileType}
              pagination={paginationConfig}
              onAction={onAction}
            />
          )}
        </>
      )}
    </>
  );
}

export default FileTab;
