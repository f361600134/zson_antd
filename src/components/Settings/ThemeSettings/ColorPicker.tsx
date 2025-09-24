import React from 'react';
import { Flex, Typography, ColorPicker as AntdColorPicker } from 'antd';
import { useThemeStore } from '../../../store/themeStore';
import { useTranslation } from '../../../utils/i18n';
import { useSettingsStyles } from '../../../hooks';
import { useThemePresetStyles } from '../../../hooks';
import { COLOR_PRESETS } from '../../../config/settings';

const { Text } = Typography;

const ColorPicker: React.FC = () => {
  const { themeConfig, setThemeConfig } = useThemeStore();
  const { t } = useTranslation(themeConfig.language);
  const settingsStyles = useSettingsStyles();
  const {
    getColorCircleStyle,
    handleCircleHover,
    handleCircleLeave,
  } = useThemePresetStyles();

  return (
    <div style={settingsStyles.container.control}>
      <Flex align="center" gap={12} style={settingsStyles.container.row}>
        <Text style={settingsStyles.text.label}>
          {t('primaryColor')}：
        </Text>

        {/*使用AntdColorPicker 替代*/}
        {/*<Input*/}
        {/*  value={themeConfig.colorPrimary}*/}
        {/*  onChange={(e) => setThemeConfig({ colorPrimary: e.target.value })}*/}
        {/*  style={settingsStyles.form.input}*/}
        {/*  size="middle"*/}
        {/*/>*/}

        {/* 这里是新增的 Ant Design ColorPicker 组件 */}
        <AntdColorPicker
            value={themeConfig.colorPrimary}
            showText
            onChange={(color) => {
              // Antd ColorPicker 的 onChange 回调返回的是一个 Color 对象
              // 需要使用 .toHexString() 方法获取十六进制颜色值
              setThemeConfig({ colorPrimary: color.toHexString() });
            }}
        />
        
        <div style={settingsStyles.grid.colorPalette}>
          {COLOR_PRESETS.map(({ color, name }) => {
            const isSelected = themeConfig.colorPrimary === color;
            return (
              <div
                key={color}
                style={getColorCircleStyle(color, isSelected)}
                onClick={() => setThemeConfig({ colorPrimary: color })}
                onMouseEnter={(e) => handleCircleHover(e.currentTarget, isSelected)}
                onMouseLeave={(e) => handleCircleLeave(e.currentTarget, isSelected)}
                title={name}
              />
            );
          })}
        </div>
      </Flex>
    </div>
  );
};

export default ColorPicker;
