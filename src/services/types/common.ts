// 通用API类型定义
export interface PaginationParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface SearchParams {
  keyword?: string;
  filters?: Record<string, any>;
}

export interface ApiListParams extends PaginationParams, SearchParams {
  // 扩展其他列表查询参数
}

// 响应状态码
export enum ApiStatusCode {
  SUCCESS = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503,
}

// 错误类型
export interface ApiErrorDetail {
  field?: string;
  message: string;
  code?: string;
}

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}