import React, { useEffect } from 'react';
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
      }
    };
    initAuth();
  }, [checkAuth, setLoading]);

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