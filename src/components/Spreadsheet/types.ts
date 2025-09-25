// Spreadsheet 模块的类型定义
import {FileAction} from "./hooks/useFileActions.ts";

//抽象类接口
export interface File {
  id: string;
  name: string;
  createTime: string;
  updateTime: string;
  branch: string;
  size: string;
  url: string;
}

//Excel接口
export interface ExcelFile extends File{
  type: 'excel';
}

//Json文件接口
export interface JsonFile extends File {
  type: 'config' | 'data' | 'schema';
}

//显示模式 表格/列表
export type ViewMode = 'grid' | 'list';

export interface FilterOptions {
  searchText: string;
  selectedBranch: string;
}

export interface FileActionMenuProps {
  file: ExcelFile | JsonFile;
  //onPreview: (file: ExcelFile | JsonFile) => void;
  onAction: (action: FileAction, file: ExcelFile | JsonFile) => void;
}
