import { useCallback } from 'react';
import { message } from 'antd';
import {ExcelFile, JsonFile} from "../types.ts";

export type FileType = 'excel' | 'json';
export type FileAction = 'view' | 'download' | 'delete';

type ActionHandler = (file: ExcelFile | JsonFile) => Promise<void>;

const actionHandlers: Record<FileType, Record<FileAction, ActionHandler>> = {
  excel: {
    view: async (file) => {
      // 调用 Syncfusion API
      message.info(`使用 Syncfusion 打开 Excel 文件: ${file.name}`);
      // await syncfusionApi.open(file.url);
    },
    download: async (file) => {
      message.info(`下载 Excel: ${file.name}`);
    },
    delete: async (file) => {
      message.info(`删除 Excel: ${file.name}`);
    }
  },
  json: {
    view: async (file) => {
      // 显示 JSON 模态框
      message.info(`在 Modal 内显示 JSON 文件: ${file.name}`);
      // showJsonModal(file.content);
    },
    download: async (file) => {
      message.info(`下载 JSON: ${file.name}`);
    },
    delete: async (file) => {
      message.info(`删除 JSON: ${file.name}`);
    }
  }
};

export const useFileActions = () => {
  const handleFileAction = useCallback(
      async (action: FileAction, file: ExcelFile | JsonFile, fileType: FileType) => {
        try {
          const handler = actionHandlers[fileType]?.[action];
          if (handler) {
            await handler(file);
          } else {
            message.info(`未实现的操作: ${action} for ${fileType}`);
            throw new Error(`未实现的操作: ${action} for ${fileType}`);
          }
        } catch (e) {
          message.error((e as Error).message);
        }
      },
      []
  );
  return { handleFileAction };
};

export default useFileActions;


// export const useFileActions = () => {
//   const handleFileAction = useCallback((action: string, fileName: string) => {
//     switch (action) {
//       case 'view':
//         message.info(`查看文件: ${fileName}`);
//         // TODO: 实现文件查看逻辑
//         break;
//       case 'download':
//         message.success(`下载文件: ${fileName}`);
//         // TODO: 实现文件下载逻辑
//         break;
//       case 'delete':
//         message.warning(`删除文件: ${fileName}`);
//         // TODO: 实现文件删除逻辑
//         break;
//       default:
//         message.error(`未知操作: ${action}`);
//     }
//   }, []);
//
//   return {
//     handleFileAction
//   };
// };
