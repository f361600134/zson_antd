import { ConfigProvider, theme } from 'antd';
import AppLayout from './components/Layout/AppLayout';
import Dashboard from './components/Dashboard/Dashboard';
import { useThemeStore } from './store/themeStore';

function App() {
  const { themeConfig } = useThemeStore();

  // 获取主题特定的颜色配置
  const getThemeColors = () => {
    switch (themeConfig.presetTheme) {
      case 'compact':
        return {
          colorPrimary: '#52c41a',
          colorSuccess: '#52c41a',
          colorInfo: '#1890ff',
          colorWarning: '#faad14',
          colorError: '#ff4d4f',
        };
      case 'colorful':
        return {
          colorPrimary: '#eb2f96',
          colorSuccess: '#52c41a',
          colorInfo: '#722ed1',
          colorWarning: '#faad14',
          colorError: '#ff4d4f',
        };
      case 'luxury':
        return {
          colorPrimary: '#FFD700',
          colorSuccess: '#D4AF37',
          colorInfo: '#B8860B',
          colorWarning: '#DAA520',
          colorError: '#CD853F',
        };
      default:
        return {
          colorPrimary: themeConfig.colorPrimary,
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
    ];
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