import { useState, useMemo } from 'react';

export interface PaginationConfig {
  current: number;
  pageSize: number;
  total: number;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: (total: number, range: [number, number]) => string;
}

export const usePagination = (defaultPageSize: number = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    if (size !== pageSize) {
      setPageSize(size);
      // 当页面大小改变时，重置到第一页
      setCurrentPage(1);
    }
  };

  const getPaginatedData = <T>(data: T[]): T[] => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
  };

  const getPaginationConfig = (total: number): PaginationConfig => ({
    current: currentPage,
    pageSize,
    total,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number, range: [number, number]) =>
      `显示 ${range[0]}-${range[1]} 条，共 ${total} 条`,
    onChange: handlePageChange,
  });

  const resetPagination = () => {
    setCurrentPage(1);
  };

  return {
    currentPage,
    pageSize,
    handlePageChange,
    getPaginatedData,
    getPaginationConfig,
    resetPagination,
  };
};
