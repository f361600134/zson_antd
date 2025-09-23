import { ConfigProvider, theme } from 'antd';
import AppLayout from './components/Layout/AppLayout';
import Dashboard from './components/Dashboard/Dashboard';
import { useThemeStore } from './store/themeStore';

function App() {
  const { themeConfig } = useThemeStore();

  // 获取主题特定的颜色配置
  const getThemeColors = () => {
    // 优先使用用户自定义的主色调，如果没有则使用预设主题的默认颜色
    const primaryColor = themeConfig.colorPrimary;
    
    switch (themeConfig.presetTheme) {
      case 'compact':
        return {
          colorPrimary: primaryColor, // 使用用户设置的颜色
          colorSuccess: '#52c41a',
          colorInfo: '#1890ff',
          colorWarning: '#faad14',
          colorError: '#ff4d4f',
        };
      case 'colorful':
        return {
          colorPrimary: primaryColor, // 使用用户设置的颜色
          colorSuccess: '#52c41a',
          colorInfo: '#722ed1',
          colorWarning: '#faad14',
          colorError: '#ff4d4f',
        };
      case 'luxury':
        return {
          colorPrimary: primaryColor, // 使用用户设置的颜色
          colorSuccess: '#52c41a',
          colorInfo: '#B8860B',
          colorWarning: '#DAA520',
          colorError: '#ff4d4f',
        };
      default:
        return {
          colorPrimary: primaryColor, // 使用用户设置的颜色
          colorSuccess: '#52c41a',
          colorInfo: '#1890ff',
          colorWarning: '#faad14',
          colorError: '#ff4d4f',
        };
    }
  };

  const themeColors = getThemeColors();

  const antdTheme = {
    token: {
      ...themeColors,
      borderRadius: themeConfig.borderRadius,
      fontSize: 14,
      colorBgBase: themeConfig.themeMode === 'dark' ? '#141414' : '#ffffff',
      colorBgContainer: themeConfig.themeMode === 'dark' ? '#1f1f1f' : '#ffffff',
      colorBgLayout: themeConfig.themeMode === 'dark' ? '#000000' : '#f5f5f5',
      // 统计组件的颜色会自动使用 colorPrimary
      colorText: themeConfig.themeMode === 'dark' ? '#ffffff' : '#000000',
      colorTextSecondary: themeConfig.themeMode === 'dark' ? '#8c8c8c' : '#666666',
    },
    algorithm: themeConfig.themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
    components: {
      Layout: {
        siderBg: themeConfig.themeMode === 'dark' ? '#141414' : '#ffffff',
        headerBg: themeConfig.themeMode === 'dark' ? '#141414' : '#ffffff',
        bodyBg: themeConfig.themeMode === 'dark' ? '#000000' : '#f5f5f5',
      },
      Menu: {
        itemBg: 'transparent',
        itemHoverBg: themeConfig.themeMode === 'dark' ? '#1f1f1f' : '#f0f5ff',
        itemSelectedBg: themeConfig.themeMode === 'dark' ? '#111b26' : '#e6f4ff',
        itemSelectedColor: themeColors.colorPrimary,
      },
      Card: {
        colorBgContainer: themeConfig.themeMode === 'dark' ? '#1f1f1f' : '#ffffff',
      },
      Statistic: {
        // Statistic 组件会自动使用 colorPrimary
        titleFontSize: 14,
        contentFontSize: 24,
      }
    }
  };

  if (themeConfig.compactMode) {
    antdTheme.algorithm = [
      themeConfig.themeMode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
      theme.compactAlgorithm
    ] as never; // 临时解决类型问题
  }

  return (
    <ConfigProvider
      theme={antdTheme}
    >
      <AppLayout>
        <Dashboard />
      </AppLayout>
    </ConfigProvider>
  );
}

export default App;