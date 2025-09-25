import { useCallback } from 'react';
import { message } from 'antd';
import {ExcelFile, JsonFile} from "../types.ts";
import {downloadExcel, downloadJson, viewExcel, viewJson} from "../utils.ts";

export type FileType = 'excel' | 'json';
export type FileAction = 'view' | 'download' | 'delete';

type ActionHandler = (file: ExcelFile | JsonFile) => Promise<void>;

interface UseFileActionsDeps {
  showJson?: (file: JsonFile) => void; // 注入 JSON 预览函数
  showExcel?: (file: ExcelFile) => void; // 注入 Excel 预览函数
}

export const useFileActions = (deps?: UseFileActionsDeps) => {
  const handlers: Record<FileType, Record<FileAction, ActionHandler>> = {
    excel: {
      view: (file) => viewExcel(file as ExcelFile, deps?.showExcel),
      download: (file) => downloadExcel(file as ExcelFile),
      delete: async (file) => {
        message.info(`删除 Excel: ${file.name}`);
      },
    },
    json: {
      view: (file) => viewJson(file as JsonFile, deps?.showJson),
      download: (file) => downloadJson(file as JsonFile),
      delete: async (file) => {
        message.info(`删除 JSON: ${file.name}`);
      },
    }
  };

  // 重载：让 TS 在调用处得到更好的类型提示与校验
  async function handleFileAction(action: FileAction, file: ExcelFile, fileType: 'excel'): Promise<void>;
  async function handleFileAction(action: FileAction, file: JsonFile,  fileType: 'json'):  Promise<void>;
  async function handleFileAction(action: FileAction, file: ExcelFile | JsonFile, fileType: FileType) {
    try {
      if (fileType === 'excel') {
        await handlers.excel[action](file as ExcelFile);
      } else {
        await handlers.json[action](file as JsonFile);
      }
    } catch (e) {
      message.error((e as Error).message || '操作失败');
    }
  }

  // 用 useCallback 包一层，保证引用稳定
  const stableHandle = useCallback(handleFileAction, [deps?.showJson]);

  return { handleFileAction: stableHandle };
};
