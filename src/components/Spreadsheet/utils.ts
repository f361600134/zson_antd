import type { ExcelFile, JsonFile, FilterOptions } from './types';
import {message} from "antd";

/**
 * 获取JSON文件类型对应的颜色
 */
export const getJsonTypeColor = (type: string): string => {
  switch (type) {
    case 'config':
      return 'blue';
    case 'data':
      return 'green';
    case 'schema':
      return 'orange';
    default:
      return 'default';
  }
};

/**
 * 过滤Excel文件
 */
export const filterExcelFiles = (
  files: ExcelFile[], 
  { searchText, selectedBranch }: FilterOptions
): ExcelFile[] => {
  return files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesBranch = selectedBranch === 'all' || file.branch === selectedBranch;
    return matchesSearch && matchesBranch;
  });
};

/**
 * 过滤JSON文件
 */
export const filterJsonFiles = (
  files: JsonFile[], 
  { searchText, selectedBranch }: FilterOptions
): JsonFile[] => {
  return files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesBranch = selectedBranch === 'all' || file.branch === selectedBranch;
    return matchesSearch && matchesBranch;
  });
};

// Excel 下载
export async function downloadExcel(file: ExcelFile) {
  try {
    const a = document.createElement('a');
    a.href = file.url; // 假设后端已提供直链
    a.download = file.name || 'excel.xlsx';
    a.click();
    message.success(`已开始下载：${file.name}`);
  } catch {
    message.error('Excel 下载失败');
  }
}

// JSON 下载
export async function downloadJson(file: JsonFile) {
  try {
    const jsonStr = JSON.stringify(file, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file.name}.json`;
    a.click();
    URL.revokeObjectURL(url);
    message.success(`已下载 JSON：${file.name}`);
  } catch {
    message.error('JSON 下载失败');
  }
}

// Excel 打开（Syncfusion）
export async function viewExcel(file: ExcelFile, showExcel?: (file: ExcelFile) => void) {
  message.info(`使用 Syncfusion 打开 Excel: ${file.name}`);
  if (!showExcel) {
    message.warning('未注入 showExcel，无法预览 JSON');
    return;
  }
  showExcel(file);
}

// JSON 打开（调用注入的 showJson）
export async function viewJson(file: JsonFile, showJson?: (file: JsonFile) => void) {
  if (!showJson) {
    message.warning('未注入 showJson，无法预览 JSON');
    return;
  }
  showJson(file);
}