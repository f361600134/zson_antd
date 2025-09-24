import { useState, useEffect } from 'react';

interface ResponsiveColumns {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export const useResponsiveColumns = (): ResponsiveColumns => {
  const [columns, setColumns] = useState<ResponsiveColumns>({
    xs: 24, // 1列
    sm: 12, // 2列
    md: 8,  // 3列
    lg: 6,  // 4列
    xl: 4,  // 6列
    xxl: 4  // 6列
  });

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      
      // 根据屏幕宽度动态计算列数
      if (width < 576) {
        // xs: 超小屏幕 - 1列
        setColumns({
          xs: 24, sm: 24, md: 24, lg: 24, xl: 24, xxl: 24
        });
      } else if (width < 768) {
        // sm: 小屏幕 - 2列
        setColumns({
          xs: 24, sm: 12, md: 12, lg: 12, xl: 12, xxl: 12
        });
      } else if (width < 992) {
        // md: 中等屏幕 - 3列
        setColumns({
          xs: 24, sm: 12, md: 8, lg: 8, xl: 8, xxl: 8
        });
      } else if (width < 1200) {
        // lg: 大屏幕 - 4列
        setColumns({
          xs: 24, sm: 12, md: 8, lg: 6, xl: 6, xxl: 6
        });
      } else if (width < 1600) {
        // xl: 超大屏幕 - 6列
        setColumns({
          xs: 24, sm: 12, md: 8, lg: 6, xl: 4, xxl: 4
        });
      } else {
        // xxl: 超超大屏幕 - 8列
        setColumns({
          xs: 24, sm: 12, md: 8, lg: 6, xl: 4, xxl: 3
        });
      }
    };

    // 初始设置
    updateColumns();

    // 监听窗口大小变化
    window.addEventListener('resize', updateColumns);

    return () => {
      window.removeEventListener('resize', updateColumns);
    };
  }, []);

  return columns;
};
