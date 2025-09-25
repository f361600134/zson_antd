import type { ExcelFile, JsonFile } from './types';

// 分支列表
export const BRANCHES = ['all', 'main', 'develop', 'feature/inventory', 'feature/i18n'];

// 模拟的 Excel 文件数据
export const MOCK_EXCEL_FILES: ExcelFile[] = [
  {
    id: '1',
    name: 'Sales_Report_Q4_2024_Final_Version.xlsx',
    createTime: '2024-12-15 10:30:00',
    updateTime: '2025-01-10 14:20:00',
    branch: 'main',
    size: '2.5MB',
    url: 'http://localhost:8080',
  },
  {
    id: '2',
    name: 'Employee_Data.xlsx',
    createTime: '2024-11-20 09:15:00',
    updateTime: '2025-01-08 16:45:00',
    branch: 'develop',
    size: '1.8MB',
    url: 'http://localhost:8080',
  },
  {
    id: '3',
    name: 'Financial_Analysis_2024.xlsx',
    createTime: '2024-12-01 11:00:00',
    updateTime: '2025-01-05 13:30:00',
    branch: 'main',
    size: '3.2MB',
    url: 'http://localhost:8080',
  },
  {
    id: '4',
    name: 'Inventory_Management_System_Data_Export.xlsx',
    createTime: '2024-10-15 14:20:00',
    updateTime: '2024-12-28 10:15:00',
    branch: 'feature/inventory',
    size: '4.1MB',
    url: 'http://localhost:8080',
  },
  {
    id: '5',
    name: 'Customer_Feedback_Analysis.xlsx',
    createTime: '2024-11-30 16:45:00',
    updateTime: '2025-01-03 09:20:00',
    branch: 'main',
    size: '1.5MB',
    url: 'http://localhost:8080',
  },
  {
    id: '6',
    name: 'Marketing_Campaign_Results.xlsx',
    createTime: '2024-12-10 08:30:00',
    updateTime: '2025-01-07 15:10:00',
    branch: 'develop',
    size: '2.8MB',
    url: 'http://localhost:8080',
  },
  {
    id: '7',
    name: 'cw.宠物前缀.xlsx',
    createTime: '2024-12-10 08:30:00',
    updateTime: '2025-01-07 15:10:00',
    branch: 'develop',
    size: '2.8MB',
    url: 'http://localhost:8080',
  },
  {
    id: '8',
    name: 'cw.宠物基础.xlsx',
    createTime: '2024-12-10 08:30:00',
    updateTime: '2025-01-07 15:10:00',
    branch: 'develop',
    size: '2.8MB',
    url: 'http://localhost:8080',
  },
  {
    id: '9',
    name: 'cw.宠物属性资质.xlsx',
    createTime: '2024-12-10 08:30:00',
    updateTime: '2024-01-07 15:10:00',
    branch: 'develop',
    size: '2.8MB',
    url: 'http://localhost:8080',
  }
];

// 模拟的 JSON 文件数据
export const MOCK_JSON_FILES: JsonFile[] = [
  {
    id: '1',
    name: 'app_config.json',
    createTime: '2024-12-20 10:00:00',
    updateTime: '2025-01-09 11:30:00',
    branch: 'main',
    size: '15KB',
    type: 'config',
    url: 'http://localhost:8080',
  },
  {
    id: '2',
    name: 'user_data_schema.json',
    createTime: '2024-11-15 14:20:00',
    updateTime: '2025-01-05 16:45:00',
    branch: 'develop',
    size: '8KB',
    type: 'schema',
    url: 'http://localhost:8080',
  },
  {
    id: '3',
    name: 'api_response_data.json',
    createTime: '2024-12-05 09:15:00',
    updateTime: '2025-01-08 13:20:00',
    branch: 'main',
    size: '125KB',
    type: 'data',
    url: 'http://localhost:8080',
  },
  {
    id: '4',
    name: 'localization_strings.json',
    createTime: '2024-10-30 11:45:00',
    updateTime: '2024-12-30 10:30:00',
    branch: 'feature/i18n',
    size: '45KB',
    type: 'config',
    url: 'http://localhost:8080',
  }
];

// 样式常量
export const FILE_CARD_STYLE: React.CSSProperties = {
  //height: '120px', // 从180px减小到140px（约减小22%）
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
};

export const FILE_CARD_HOVER_STYLE: React.CSSProperties = {
  transform: 'scale(1.02)',
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
};
