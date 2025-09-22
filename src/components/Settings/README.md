# Settings Components

系统设置组件的重构结构说明。

## 目录结构

```
src/components/Settings/
├── SystemSettings.tsx          # 主设置页面组件
├── ThemeSettings/             # 主题设置模块
│   ├── index.ts
│   ├── ThemeSettings.tsx      # 主题设置容器
│   ├── ThemePresets.tsx       # 主题预设选择器
│   ├── ColorPicker.tsx        # 颜色选择器
│   └── ThemeControls.tsx      # 主题控制项（圆角、间距等）
├── LanguageSettings/          # 语言设置模块
│   ├── index.ts
│   └── LanguageSettings.tsx   # 语言设置组件
├── GeneralSettings/           # 通用设置模块
│   ├── index.ts
│   ├── GeneralSettings.tsx    # 通用设置容器
│   └── UserSettings.tsx       # 用户相关设置
├── index.ts                   # 设置组件导出
└── README.md                  # 说明文档
```

## 设计原则

### 1. 单一职责原则
- 每个组件只负责一个特定的设置功能
- `ThemePresets` 只负责主题预设选择
- `ColorPicker` 只负责颜色选择
- `UserSettings` 只负责用户相关设置

### 2. 模块化组织
- 按功能领域分组（主题、语言、通用）
- 每个模块有独立的 index.ts 导出文件
- 便于按需导入和代码分割

### 3. 配置驱动
- 使用 `src/config/settings.ts` 管理配置常量
- 颜色预设、语言选项等都通过配置文件管理
- 便于维护和扩展

### 4. 样式统一
- 使用 `useSettingsStyles` hook 统一管理样式
- 响应主题变化，支持明暗模式
- 避免样式代码重复

### 5. 类型安全
- `src/types/settings.ts` 定义所有设置相关类型
- 确保组件间的类型一致性
- 便于 TypeScript 类型检查

## 扩展指南

### 添加新的设置模块

1. 在 `Settings` 目录下创建新模块文件夹
2. 创建模块的主组件和子组件
3. 在模块的 `index.ts` 中导出组件
4. 在 `src/types/settings.ts` 中添加相关类型定义
5. 在 `src/config/settings.ts` 中添加配置常量
6. 在主 `SystemSettings.tsx` 中引入新模块

### 添加新的主题预设

1. 在 `ThemePresets.tsx` 中的 `presetThemes` 数组添加新预设
2. 在 `src/store/themeStore.ts` 中的 `presetThemes` 对象添加配置
3. 更新相关类型定义

### 添加新的颜色预设

1. 在 `src/config/settings.ts` 的 `COLOR_PRESETS` 中添加新颜色
2. 组件会自动使用新的预设颜色

## 优势

1. **可维护性**: 代码结构清晰，职责分明
2. **可扩展性**: 模块化设计，易于添加新功能
3. **可重用性**: 组件可以在其他地方复用
4. **类型安全**: 完整的 TypeScript 类型支持
5. **配置驱动**: 通过配置文件管理常量，便于维护
6. **样式一致性**: 统一的样式管理系统
