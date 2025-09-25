import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { useAuthStore } from '../../store/authStore';
import LoginPage from './LoginPage';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ComponentType;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  fallback: FallbackComponent 
}) => {
  const { isAuthenticated, checkAuth, setLoading } = useAuthStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // 初始化时检查认证状态
    const initAuth = async () => {
      setLoading(true);
      try {
        // 模拟检查token有效性的异步操作
        await new Promise(resolve => setTimeout(resolve, 500));
        checkAuth();
      } finally {
        setLoading(false);
        setIsInitialized(true);
      }
    };

    initAuth();
  }, [checkAuth, setLoading]);

  // 初始化加载中
  if (!isInitialized) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        gap: 16
      }}>
        <Spin size="large" />
        <div style={{ color: '#8c8c8c' }}>正在初始化...</div>
      </div>
    );
  }

  // 未认证，显示登录页面
  if (!isAuthenticated) {
    if (FallbackComponent) {
      return <FallbackComponent />;
    }
    return <LoginPage onLoginSuccess={() => window.location.reload()} />;
  }

  // 已认证，显示子组件
  return <>{children}</>;
};

export default AuthGuard;