# Spreadsheet 组件

经过重构的电子表格文件管理组件，采用模块化设计，提高了代码的可维护性和复用性。

## 📁 目录结构

```
src/components/Spreadsheet/
├── components/                 # 子组件
│   ├── FileActionMenu.tsx     # 文件操作菜单
│   ├── FileToolbar.tsx        # 工具栏（搜索、筛选、视图切换）
│   ├── ExcelFileCard.tsx      # Excel文件卡片
│   ├── JsonFileCard.tsx       # JSON文件卡片
│   ├── FileGridView.tsx       # 网格视图
│   ├── FileListView.tsx       # 列表视图
│   └── FileTab.tsx            # 标签页内容
├── hooks/                     # 自定义 Hooks
│   ├── useFileData.ts         # 文件数据管理
│   └── useFileActions.ts      # 文件操作逻辑
├── types.ts                   # 类型定义
├── constants.ts               # 常量定义
├── utils.ts                   # 工具函数
├── Spreadsheet.tsx            # 主组件
├── index.ts                   # 导出文件
└── README.md                  # 说明文档
```

## 🚀 重构优化

### 主要改进

1. **模块化拆分**: 将原来500+行的单文件拆分成多个职责单一的小组件
2. **类型安全**: 完善的TypeScript类型定义
3. **逻辑分离**: 使用自定义Hooks分离数据逻辑和操作逻辑
4. **组件复用**: 通过泛型实现Excel和JSON文件组件的复用
5. **常量管理**: 统一管理样式常量和模拟数据
6. **工具函数**: 提取公共工具函数，便于测试和复用

### 性能优化

1. **组件懒加载**: 主组件已在 `pageRegistry.tsx` 中配置懒加载
2. **状态优化**: 使用 `useMemo` 优化过滤计算
3. **事件处理**: 使用 `useCallback` 避免不必要的重渲染

## 📋 组件说明

### 主组件 - Spreadsheet
入口组件，管理标签页状态和全局配置。

### 子组件

#### FileActionMenu
- 文件操作下拉菜单
- 支持查看、下载、删除操作
- 可扩展更多操作

#### FileToolbar
- 搜索和筛选工具栏
- 视图模式切换（网格/列表）
- 分支筛选

#### FileCard Components
- `ExcelFileCard`: Excel文件卡片展示
- `JsonFileCard`: JSON文件卡片展示
- 支持悬停效果和操作菜单

#### View Components
- `FileGridView`: 网格布局视图
- `FileListView`: 列表布局视图
- 通过泛型支持不同文件类型

#### FileTab
- 标签页内容容器
- 集成工具栏、视图切换和空状态

### 自定义Hooks

#### useFileData
- 管理文件数据
- 提供过滤后的文件列表
- 便于后续接入真实API

#### useFileActions
- 处理文件操作逻辑
- 统一的操作反馈
- 易于扩展新操作

## 🔧 使用方式

```tsx
import Spreadsheet from '@/components/Spreadsheet';

// 直接使用
<Spreadsheet />

// 或者使用子组件
import { FileToolbar, ExcelFileCard } from '@/components/Spreadsheet';
```

## 🎯 扩展点

1. **新文件类型**: 添加新的文件卡片组件
2. **新操作**: 在 `useFileActions` 中添加新的操作逻辑
3. **新视图**: 添加新的视图组件（如看板视图）
4. **数据源**: 替换 `useFileData` 中的模拟数据为真实API
5. **权限控制**: 在操作菜单中添加权限验证

## 📝 后续优化建议

1. **添加单元测试**: 为工具函数和Hooks添加测试
2. **错误边界**: 添加错误处理组件
3. **虚拟滚动**: 大量文件时的性能优化
4. **拖拽上传**: 支持拖拽上传文件
5. **批量操作**: 支持多选和批量操作
6. **实时更新**: WebSocket实时同步文件变化

## 🔄 迁移说明

重构后的组件完全向后兼容，可以直接替换原来的 `Spreadsheet` 组件，无需修改使用方的代码。
