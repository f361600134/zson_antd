// Spreadsheet 模块的类型定义
export interface ExcelFile {
  id: string;
  name: string;
  createTime: string;
  updateTime: string;
  branch: string;
  size: string;
}

export interface JsonFile {
  id: string;
  name: string;
  createTime: string;
  updateTime: string;
  branch: string;
  size: string;
  type: 'config' | 'data' | 'schema';
}

export type ViewMode = 'grid' | 'list';

export interface FilterOptions {
  searchText: string;
  selectedBranch: string;
}

export interface FileActionMenuProps {
  file: ExcelFile | JsonFile;
  onPreview: (file: ExcelFile | JsonFile) => void;
  onAction: (action: string, fileName: string) => void;
}
