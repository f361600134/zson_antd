import type { ExcelFile, JsonFile, FilterOptions } from './types';

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
