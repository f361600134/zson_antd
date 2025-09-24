import type { ExcelFile, JsonFile, FilterOptions } from './types';

// 添加格式化文件大小的工具函数（如果还没有的话）
export const formatFileSize = (size: string): string => {
  // 如果已经有格式化逻辑，可以替换这个实现
  return size; // 或者实现具体的格式化逻辑
};


/**
 * 截断文件后缀
 * @param filename
 */
export const removeFileExtension = (filename: string): string => {
  // Find the index of the last period in the filename.
  const lastDotIndex = filename.lastIndexOf('.');

  // If no period is found, return the original filename.
  if (lastDotIndex === -1) {
    return filename;
  }

  // Return the substring before the last period.
  return filename.substring(0, lastDotIndex);
};

/**
 * 截断文件名
 */
export const truncateFileName = (name: string, maxLength: number = 25): string => {
  //return name.length > maxLength ? `${name.substring(0, maxLength)}...` : name;
  return name;
};

/**
 * 获取分支对应的颜色
 */
export const getBranchColor = (branch: string): string => {
  switch (branch) {
    case 'main':
      return 'blue';
    case 'develop':
      return 'green';
    case 'feature/inventory':
      return 'orange';
    case 'feature/i18n':
      return 'purple';
    default:
      return 'default';
  }
};

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
