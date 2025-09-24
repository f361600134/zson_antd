import { useCallback } from 'react';
import { message } from 'antd';
import {ExcelFile, JsonFile} from "../types.ts";

export type FileType = 'excel' | 'json';
export type FileAction = 'view' | 'download' | 'delete';

type ActionHandler = (file: ExcelFile | JsonFile) => Promise<void>;

interface UseFileActionsDeps {
  showJson?: (file: JsonFile) => void; // 注入 JSON 预览函数
}

export const useFileActions = (deps?: UseFileActionsDeps) => {
  const actionHandlers: Record<FileType, Record<FileAction, ActionHandler>> = {
    excel: {
      view: async (file) => {
        // TODO: 调用 Syncfusion API 打开 Excel
        message.info(`使用 Syncfusion 打开 Excel 文件: ${file.name}`);
        // await syncfusionApi.open(file.url);
      },
      download: async (file) => {
        try {
          // const excelFile = file as ExcelFile;
          // 假设后端给的就是一个可下载的 URL
          // const link = document.createElement('a');
          // link.href = excelFile.url;
          // link.download = excelFile.name || 'excel.xlsx';
          // link.click();
          message.success(`已开始下载 Excel: ${file.name}`);
        } catch (e) {
          message.error("Excel 下载失败");
        }
      },
      delete: async (file) => {
        message.info(`删除 Excel: ${file.name}`);
      }
    },
    json: {
      view: async (file) => {
        if (deps?.showJson) {
          deps.showJson(file as JsonFile); // 打开 JSON 预览 Modal
        } else {
          message.warning("未注入 showJson，无法预览 JSON");
        }
      },
      download: async (file) => {
        try {
          const jsonFile = file as JsonFile;
          const jsonStr = JSON.stringify(jsonFile, null, 2);
          const blob = new Blob([jsonStr], { type: "application/json" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${jsonFile.name}.json`;
          a.click();
          URL.revokeObjectURL(url);
          message.success(`已下载 JSON: ${file.name}`);
        } catch (e) {
          message.error("JSON 下载失败");
        }
      },
      delete: async (file) => {
        message.info(`删除 JSON: ${file.name}`);
      }
    }
  };

  const handleFileAction = useCallback(
      async (action: FileAction, file: ExcelFile | JsonFile, fileType: FileType) => {
        try {
          const handler = actionHandlers[fileType]?.[action];
          if (handler) {
            await handler(file);
          } else {
            throw new Error(`未实现的操作: ${action} for ${fileType}`);
          }
        } catch (e) {
          message.error((e as Error).message);
        }
      },
      [deps] // 依赖 showJson
  );

  return { handleFileAction };
};

// const actionHandlers: Record<FileType, Record<FileAction, ActionHandler>> = {
//   excel: {
//     view: async (file) => {
//       // 调用 Syncfusion API
//
//       message.info(`使用 Syncfusion 打开 Excel 文件: ${file.name}`);
//       // await syncfusionApi.open(file.url);
//     },
//     download: async (file) => {
//       message.info(`下载 Excel: ${file.name}`);
//     },
//     delete: async (file) => {
//       message.info(`删除 Excel: ${file.name}`);
//     }
//   },
//   json: {
//     view: async (file) => {
//       // 显示 JSON 模态框
//       message.info(`在 Modal 内显示 JSON 文件: ${file.name}`);
//       // showJsonModal(file.content);
//     },
//     download: async (file) => {
//       message.info(`下载 JSON: ${file.name}`);
//     },
//     delete: async (file) => {
//       message.info(`删除 JSON: ${file.name}`);
//     }
//   }
// };
//
// export const useFileActions = () => {
//   const handleFileAction = useCallback(
//       async (action: FileAction, file: ExcelFile | JsonFile, fileType: FileType) => {
//         try {
//           const handler = actionHandlers[fileType]?.[action];
//           if (handler) {
//             await handler(file);
//           } else {
//             message.info(`未实现的操作: ${action} for ${fileType}`);
//             throw new Error(`未实现的操作: ${action} for ${fileType}`);
//           }
//         } catch (e) {
//           message.error((e as Error).message);
//         }
//       },
//       []
//   );
//   return { handleFileAction };
// };

