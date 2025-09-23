import { useMemo } from 'react';
import { useThemeStore } from '../store/themeStore';

/**
 * 主题预设相关的样式 hook
 */
export const useThemePresetStyles = () => {
  const { themeConfig } = useThemeStore();

  // 获取当前主色调
  const getCurrentPrimaryColor = () => {
    // 直接返回用户设置的主色调，不再根据预设主题硬编码
    return themeConfig.colorPrimary;
  };

  const primaryColor = getCurrentPrimaryColor();

  const styles = useMemo(() => ({
    // 主题预设卡片样式
    themeCard: {
      base: {
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        borderRadius: '8px',
        padding: '12px',
        textAlign: 'center' as const,
        position: 'relative' as const,
        overflow: 'hidden' as const,
      },
      normal: {
        border: '2px solid transparent',
        boxShadow: 'none',
        transform: 'scale(1)',
      },
      selected: {
        border: `2px solid ${primaryColor}`,
        boxShadow: `0 0 0 3px ${primaryColor}20`,
        transform: 'scale(1.02)',
      },
      hover: {
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
        transform: 'translateY(-2px)',
      }
    },

    // 勾选图标样式
    checkIcon: {
      position: 'absolute' as const,
      top: '4px',
      right: '4px',
      width: '16px',
      height: '16px',
      backgroundColor: primaryColor,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontSize: '10px',
    },

    // 主题名称文本样式
    themeName: {
      fontSize: '12px',
      color: themeConfig.themeMode === 'dark' ? '#8c8c8c' : '#666',
      display: 'block',
      marginTop: '4px',
    },

    // 颜色圆圈样式
    colorCircle: {
      base: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        border: '2px solid #fff',
      },
      normal: {
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transform: 'scale(1)',
      },
      selected: {
        boxShadow: `0 0 0 2px #fff, 0 0 0 4px ${primaryColor}`,
        transform: 'scale(1.1)',
      },
      hover: {
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
        transform: 'scale(1.1)',
      }
    },

    // 容器样式
    container: {
      presetGrid: {
        marginBottom: '20px',
      },
      colorRow: {
        marginBottom: '16px',
      }
    }
  }), [primaryColor, themeConfig.themeMode]);

  // 样式生成函数
  const getThemeCardStyle = (isSelected: boolean) => ({
    ...styles.themeCard.base,
    ...(isSelected ? styles.themeCard.selected : styles.themeCard.normal),
  });

  const getColorCircleStyle = (color: string, isSelected: boolean) => ({
    ...styles.colorCircle.base,
    backgroundColor: color,
    ...(isSelected ? styles.colorCircle.selected : styles.colorCircle.normal),
  });

  // 事件处理函数
  const handleCardHover = (element: HTMLElement, isSelected: boolean) => {
    if (!isSelected) {
      Object.assign(element.style, styles.themeCard.hover);
    }
  };

  const handleCardLeave = (element: HTMLElement, isSelected: boolean) => {
    if (!isSelected) {
      element.style.boxShadow = styles.themeCard.normal.boxShadow;
      element.style.transform = styles.themeCard.normal.transform;
    }
  };

  const handleCircleHover = (element: HTMLElement, isSelected: boolean) => {
    if (!isSelected) {
      Object.assign(element.style, styles.colorCircle.hover);
    }
  };

  const handleCircleLeave = (element: HTMLElement, isSelected: boolean) => {
    if (!isSelected) {
      Object.assign(element.style, styles.colorCircle.normal);
    }
  };

  return {
    styles,
    primaryColor,
    getThemeCardStyle,
    getColorCircleStyle,
    handleCardHover,
    handleCardLeave,
    handleCircleHover,
    handleCircleLeave,
  };
};
