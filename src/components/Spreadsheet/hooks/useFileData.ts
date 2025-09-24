import { useState, useMemo } from 'react';
import type { ExcelFile, JsonFile, FilterOptions } from '../types';
import { filterExcelFiles, filterJsonFiles } from '../utils';
import { MOCK_EXCEL_FILES, MOCK_JSON_FILES } from '../constants';

export const useFileData = () => {
  // 实际项目中这里应该是从API获取数据
  const [excelFiles] = useState<ExcelFile[]>(MOCK_EXCEL_FILES);
  const [jsonFiles] = useState<JsonFile[]>(MOCK_JSON_FILES);

  const getFilteredFiles = useMemo(() => ({
    excel: (filterOptions: FilterOptions) => filterExcelFiles(excelFiles, filterOptions),
    json: (filterOptions: FilterOptions) => filterJsonFiles(jsonFiles, filterOptions)
  }), [excelFiles, jsonFiles]);

  return {
    excelFiles,
    jsonFiles,
    getFilteredFiles
  };
};
