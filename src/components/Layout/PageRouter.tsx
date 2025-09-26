import React, {Suspense, useMemo} from 'react';
import {Spin, Result, Button} from 'antd';
import {ExclamationCircleOutlined, ReloadOutlined} from '@ant-design/icons';
import type {NavigationPage} from '../../types';
import {usePageRouter} from '../../hooks/usePageRouter';

interface PageRouterProps {
    currentPage: NavigationPage;
    userRoles?: string[];
    fallback?: React.ComponentType;
    onNavigate?: (page: NavigationPage) => void;
    enableAccessControl?: boolean;
}

interface PageErrorBoundaryState {
    hasError: boolean;
    error?: Error;
}

/**
 * 页面错误边界组件
 */
class PageErrorBoundary extends React.Component<
    {
        children: React.ReactNode;
        onRetry?: () => void;
        fallback?: React.ComponentType;
    },
    PageErrorBoundaryState
> {
    constructor(props: never) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(error: Error): PageErrorBoundaryState {
        return {hasError: true, error};
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Page rendering error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                const FallbackComponent = this.props.fallback;
                return <FallbackComponent/>;
            }

            return (
                <Result
                    status="500"
                    title="页面加载失败"
                    subTitle={this.state.error?.message || "抱歉，页面出现了问题"}
                    extra={
                        <Button
                            type="primary"
                            icon={<ReloadOutlined/>}
                            onClick={() => {
                                this.setState({hasError: false, error: undefined});
                                this.props.onRetry?.();
                            }}
                        >
                            重新加载
                        </Button>
                    }
                />
            );
        }

        return this.props.children;
    }
}

/**
 * 默认加载组件
 */
const DefaultLoadingFallback: React.FC = () => (
    <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px',
            flexDirection: 'column',
            gap: 16
        }}
    >
        <Spin size="large"/>
        <div style={{color: '#8c8c8c'}}>页面加载中...</div>
    </div>
);

/**
 * 无权限访问组件
 */
const UnauthorizedAccess: React.FC<{
    onNavigate?: (page: NavigationPage) => void;
}> = ({onNavigate}) => (
    <Result
        status="403"
        title="无权限访问"
        subTitle="抱歉，您没有权限访问此页面"
        icon={<ExclamationCircleOutlined/>}
        extra={
            <Button
                type="primary"
                onClick={() => onNavigate?.('dashboard')}
            >
                返回首页
            </Button>
        }
    />
);

/**
 * 页面未找到组件
 */
const PageNotFound: React.FC<{
    onNavigate?: (page: NavigationPage) => void;
}> = ({onNavigate}) => (
    <Result
        status="404"
        title="页面不存在"
        subTitle="抱歉，您访问的页面不存在"
        extra={
            <Button
                type="primary"
                onClick={() => onNavigate?.('dashboard')}
            >
                返回首页
            </Button>
        }
    />
);

/**
 * 核心页面路由组件
 */
const PageRouter: React.FC<PageRouterProps> = ({
                                                   currentPage,
                                                   userRoles = [],
                                                   fallback: FallbackComponent = DefaultLoadingFallback,
                                                   onNavigate,
                                                   enableAccessControl = true
                                               }) => {
    const {canAccess, getPageInfo} = usePageRouter({
        userRoles,
        enableAccessControl
    });

    // 获取页面配置
    const pageConfig = useMemo(() => {
        try {
            return getPageInfo(currentPage);
        } catch (error) {
            console.error(`Failed to get page config for: ${currentPage}`, error);
            return null;
        }
    }, [currentPage, getPageInfo]);

    // 页面组件渲染逻辑
    const renderPageComponent = useMemo(() => {
        // 页面不存在
        if (!pageConfig) {
            return <PageNotFound onNavigate={onNavigate}/>;
        }

        // 权限检查
        if (enableAccessControl && !canAccess(currentPage)) {
            return <UnauthorizedAccess onNavigate={onNavigate}/>;
        }

        // 渲染页面组件
        const PageComponent = pageConfig.component;
        return <PageComponent/>;
    }, [pageConfig, currentPage, canAccess, enableAccessControl, onNavigate]);

    // return (
    //   <PageErrorBoundary
    //     fallback={pageConfig?.fallback}
    //     onRetry={() => window.location.reload()}
    //     children={
    //       <Suspense fallback={<FallbackComponent />}>
    //       {renderPageComponent}
    //       </Suspense>
    //   }
    //   >
    //   </PageErrorBoundary>
    // );
    return (
        <PageErrorBoundary
            fallback={pageConfig?.fallback}
            onRetry={() => window.location.reload()}
        >
            <Suspense fallback={<FallbackComponent/>}>
                {renderPageComponent}
            </Suspense>
        </PageErrorBoundary>
    );
};

export default PageRouter;

/**
 * 简化版页面路由器 - 用于不需要权限控制的场景
 */
export const SimplePageRouter: React.FC<{
    currentPage: NavigationPage;
    fallback?: React.ComponentType;
}> = ({currentPage, fallback}) => {
    return (
        <PageRouter
            currentPage={currentPage}
            enableAccessControl={false}
            fallback={fallback}
        />
    );
};

/**
 * 带权限的页面路由器 - 预配置常用权限设置
 */
export const AuthorizedPageRouter: React.FC<{
    currentPage: NavigationPage;
    userRoles: string[];
    onNavigate: (page: NavigationPage) => void;
}> = ({currentPage, userRoles, onNavigate}) => {
    return (
        <PageRouter
            currentPage={currentPage}
            userRoles={userRoles}
            onNavigate={onNavigate}
            enableAccessControl={true}
        />
    );
};
