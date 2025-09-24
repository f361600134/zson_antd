import React from 'react';
import { Empty } from 'antd';
import type { ExcelFile, JsonFile, ViewMode, FilterOptions } from '../types';
import FileToolbar from './FileToolbar';
import FileGridView from './FileGridView';
import FileListView from './FileListView';

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
  return (
    <>
      <FileToolbar
        filterOptions={filterOptions}
        viewMode={viewMode}
        onFilterChange={onFilterChange}
        onViewModeChange={onViewModeChange}
      />

      {files.length === 0 ? (
        <Empty description={emptyDescription} />
      ) : (
        <>
          {viewMode === 'grid' ? (
            <FileGridView 
              files={files} 
              fileType={fileType} 
              onAction={onAction} 
            />
          ) : (
            <FileListView 
              files={files} 
              fileType={fileType} 
              onAction={onAction} 
            />
          )}
        </>
      )}
    </>
  );
}

export default FileTab;
