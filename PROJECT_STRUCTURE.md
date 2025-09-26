# 项目架构文档

## 概述

本项目已按照标准React架构模式重新组织，实现了清晰的关注点分离和模块化结构。

## 目录结构

```
src/
├── assets/                     # 静态资源
│   ├── images/                # 图片资源
│   ├── icons/                 # 图标资源
│   ├── fonts/                 # 字体文件
│   └── index.ts               # 资源导出
├── components/                 # 可复用组件
│   ├── Auth/                  # 认证相关组件
│   ├── Common/                # 通用组件
│   ├── Layout/                # 布局组件
│   ├── Settings/              # 设置相关组件
│   └── Spreadsheet/           # 电子表格组件
├── pages/                     # 页面级组件
│   ├── Admin/                 # 管理员页面
│   ├── Analytics/             # 数据分析页面
│   ├── Auth/                  # 认证页面
│   ├── Dashboard/             # 仪表板页面
│   ├── Documents/             # 文档管理页面
│   ├── Profile/               # 个人资料页面
│   ├── Protocol/              # 协议管理页面
│   ├── Settings/              # 系统设置页面
│   ├── Spreadsheet/           # 电子表格页面
│   ├── Team/                  # 团队管理页面
│   └── index.ts               # 页面导出
├── styles/                    # 样式系统
│   ├── variables/             # CSS变量
│   │   ├── colors.css         # 颜色变量
│   │   ├── spacing.css        # 间距变量
│   │   ├── typography.css     # 字体变量
│   │   ├── shadows.css        # 阴影变量
│   │   └── index.css          # 变量入口
│   ├── base/                  # 基础样式
│   │   ├── reset.css          # 样式重置
│   │   ├── globals.css        # 全局样式
│   │   ├── utilities.css      # 工具类
│   │   └── index.css          # 基础样式入口
│   ├── themes/                # 主题样式
│   │   ├── compact.css        # 紧凑主题
│   │   ├── colorful.css       # 多彩主题
│   │   ├── luxury.css         # 奢华主题
│   │   └── index.css          # 主题入口
│   ├── components/            # 组件样式
│   │   ├── workspace-selector.css
│   │   ├── admin-dropdown.css
│   │   ├── theme-preview.css
│   │   ├── file-table.css
│   │   └── index.css          # 组件样式入口
│   ├── pages/                 # 页面样式
│   │   ├── dashboard.css
│   │   ├── settings.css
│   │   └── index.css          # 页面样式入口
│   ├── animations/            # 动画样式
│   │   ├── transitions.css    # 过渡动画
│   │   ├── keyframes.css      # 关键帧动画
│   │   └── index.css          # 动画样式入口
│   └── index.css              # 样式系统入口
├── hooks/                     # 自定义Hooks
├── store/                     # 状态管理
├── types/                     # TypeScript类型定义
├── utils/                     # 工具函数
├── constants/                 # 常量定义
├── config/                    # 配置文件
└── index.css                  # 主样式文件
```

## 架构特点

### 1. 页面与组件分离
- **pages/**: 存放页面级组件，每个页面一个目录
- **components/**: 存放可复用的功能组件
- 清晰的职责分离，便于维护和复用

### 2. 完整的样式系统
- **CSS变量系统**: 统一管理颜色、间距、字体等
- **主题支持**: 支持多套预设主题
- **模块化样式**: 按功能模块组织样式文件
- **响应式设计**: 内置响应式断点和工具类

### 3. 静态资源管理
- **assets/**: 集中管理所有静态资源
- 按类型分类存放（图片、图标、字体）
- 统一的导入导出机制

### 4. 现代化工具链
- TypeScript 严格模式
- Vite 构建工具
- ESLint 代码规范
- CSS Variables + PostCSS

## 样式系统详解

### CSS变量命名规范
```css
/* 颜色变量 */
--color-primary      /* 主要颜色 */
--color-success      /* 成功状态 */
--text-primary       /* 主要文本 */
--bg-primary         /* 主要背景 */

/* 间距变量 */
--spacing-xs         /* 4px */
--spacing-sm         /* 8px */
--spacing-md         /* 16px */
--spacing-lg         /* 24px */

/* 字体变量 */
--font-size-base     /* 基础字号 */
--font-weight-medium /* 字重 */
```

### 主题切换
- 通过CSS变量实现主题切换
- 支持三套预设主题：compact、colorful、luxury
- 主题配置存储在Zustand状态管理中

### 工具类
- 基于CSS变量的工具类系统
- 涵盖间距、颜色、字体、布局等
- 遵循原子化CSS思想

## 开发规范

### 组件开发
1. 页面级组件放在 `pages/` 目录
2. 可复用组件放在 `components/` 目录
3. 每个组件目录包含：
   - 组件文件 (.tsx)
   - 类型定义 (types.ts)
   - 样式文件 (.css)
   - 导出文件 (index.ts)

### 样式开发
1. 优先使用CSS变量
2. 遵循BEM命名规范
3. 响应式设计优先
4. 主题兼容性检查

### 类型定义
1. 统一在 `types/` 目录管理
2. 按功能模块分类
3. 导出通用类型

## 部署与构建

### 开发环境
```bash
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run preview      # 预览构建结果
npm run lint         # 代码检查
```

### 环境配置
- 开发环境：使用Vite开发服务器
- 生产环境：静态文件部署
- 样式压缩：PostCSS + cssnano
- 代码分割：基于路由的懒加载

## 未来扩展

### 可扩展点
1. 国际化支持 (i18n)
2. PWA支持
3. 微前端架构
4. 组件库发布
5. 设计系统文档

### 性能优化
1. 代码分割和懒加载
2. 图片资源优化
3. CSS优化和压缩
4. Bundle分析和优化

## 总结

本架构实现了：
- ✅ 标准的目录结构
- ✅ 清晰的关注点分离
- ✅ 完整的样式系统
- ✅ 模块化和可扩展性
- ✅ 现代化的开发体验

符合React生态系统的最佳实践，为团队协作和项目维护奠定了良好基础。
