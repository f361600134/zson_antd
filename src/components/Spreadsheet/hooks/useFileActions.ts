import { useCallback } from 'react';
import { message } from 'antd';

export const useFileActions = () => {
  const handleFileAction = useCallback((action: string, fileName: string) => {
    switch (action) {
      case 'view':
        message.info(`查看文件: ${fileName}`);
        // TODO: 实现文件查看逻辑
        break;
      case 'download':
        message.success(`下载文件: ${fileName}`);
        // TODO: 实现文件下载逻辑
        break;
      case 'delete':
        message.warning(`删除文件: ${fileName}`);
        // TODO: 实现文件删除逻辑
        break;
      default:
        message.error(`未知操作: ${action}`);
    }
  }, []);

  return {
    handleFileAction
  };
};
