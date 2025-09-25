// useExcelViewer.tsx
import { useEffect, useRef, useState } from 'react';
import { Modal, Button, message } from 'antd';
import type { ExcelFile } from '../types';
import {
    SheetDirective,
    SheetsDirective,
    SpreadsheetComponent,
} from '@syncfusion/ej2-react-spreadsheet';

export const useExcelViewer = () => {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState<ExcelFile | null>(null);

    // 仅当 Modal 真正打开且完成过渡后再挂载 Spreadsheet
    const [mountSheet, setMountSheet] = useState(false);

    // 响应式尺寸
    const [vw, setVw] = useState(() => window.innerWidth);
    const [vh, setVh] = useState(() => window.innerHeight);

    const sheetRef = useRef<SpreadsheetComponent>(null);

    useEffect(() => {
        const onResize = () => {
            setVw(window.innerWidth);
            setVh(window.innerHeight);
            // 已挂载时刷新一下布局
            if (mountSheet) {
                // 下一帧刷新，确保容器尺寸已稳定
                requestAnimationFrame(() => sheetRef.current?.refresh());
            }
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [mountSheet]);

    const showExcel = (f: ExcelFile) => {
        setFile(f);
        setOpen(true);
    };

    // 窗口留边距，设最大宽高
    const modalWidth = Math.min(vw - 80, 1600);
    const modalBodyHeight = Math.min(vh - 170, 1000);

    const onDownload = () => {
        if (!file?.url) {
            message.warning('无可下载地址');
            return;
        }
        const a = document.createElement('a');
        a.href = file.url;
        a.download = file.name || 'excel.xlsx';
        a.click();
    };

    const ExcelModal = (
        <Modal
            open={open}
            onCancel={() => setOpen(false)}
            title={file ? `Excel 预览 - ${file.name}` : 'Excel 预览'}
            width={modalWidth}
            style={{ top: 40 }}
            styles={{body:{ padding: 0, height: modalBodyHeight }}}
            //bodyStyle={{ padding: 0, height: modalBodyHeight }}
            // 关键：等 Modal 完全打开/关闭后再挂载/卸载 Spreadsheet
            afterOpenChange={(visible) => {
                if (visible) {
                    setMountSheet(true);
                    // 等待一帧，容器尺寸 & Portal DOM 全部准备好，再 refresh
                    requestAnimationFrame(() => sheetRef.current?.refresh());
                } else {
                    setMountSheet(false);
                }
            }}
            footer={[
                <Button key="download" type="primary" onClick={onDownload}>
                    下载 Excel
                </Button>,
            ]}
        >
            {/* 只在可见且已完成打开后挂载核心组件 */}
            {mountSheet && (
                <div style={{ height: '100%', width: '100%' }}>
                    <SpreadsheetComponent
                        ref={sheetRef}
                        // 建议：仅打开你需要的功能；某些功能在隐藏状态初始化更脆弱
                        allowOpen
                        allowSave
                        allowSorting
                        allowFiltering
                        allowNumberFormatting
                        allowConditionalFormat
                        openUrl="https://document.syncfusion.com/web-services/spreadsheet-editor/api/spreadsheet/open"
                        saveUrl="https://document.syncfusion.com/web-services/spreadsheet-editor/api/spreadsheet/save"
                        style={{ height: '100%', width: '100%' }}
                    >
                        <SheetsDirective>
                            <SheetDirective name="Sheet1" />
                        </SheetsDirective>
                    </SpreadsheetComponent>
                </div>
            )}
        </Modal>
    );

    return { showExcel, ExcelModal };
};
