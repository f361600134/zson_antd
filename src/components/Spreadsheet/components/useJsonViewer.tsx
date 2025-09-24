// useJsonViewer.tsx
import { useMemo, useState } from 'react';
import { Modal, Button, message } from 'antd';
import type { JsonFile } from '../types';

function prettyJson(content: unknown): string {
    try {
        if (typeof content === 'string') {
            // 字符串则尝试 parse 再美化
            return JSON.stringify(JSON.parse(content), null, 2);
        }
        return JSON.stringify(content, null, 2);
    } catch {
        // 解析失败就原样或兜底
        return typeof content === 'string' ? content : JSON.stringify(content, null, 2);
    }
}

export const useJsonViewer = () => {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState<JsonFile | null>(null);

    // 统一签名：接收 JsonFile
    const showJson = (f: JsonFile) => {
        setFile(f);
        setOpen(true);
    };

    const text = useMemo(() => prettyJson(file), [file]);

    const JsonModal = (
        <Modal
            open={open}
            onCancel={() => setOpen(false)}
            title={file ? `JSON 预览 - ${file.name}` : 'JSON 预览'}
            width={800}
            footer={[
                <Button
                    key="copy"
                    onClick={async () => {
                        try {
                            await navigator.clipboard.writeText(text);
                            message.success('已复制到剪贴板');
                        } catch {
                            message.error('复制失败');
                        }
                    }}
                >
                    复制 JSON
                </Button>,
                <Button
                    key="download"
                    type="primary"
                    onClick={() => {
                        try {
                            const blob = new Blob([text], { type: 'application/json' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `${file?.name ?? 'data'}.json`;
                            a.click();
                            URL.revokeObjectURL(url);
                        } catch {
                            message.error('下载失败');
                        }
                    }}
                >
                    下载 JSON
                </Button>,
            ]}
        >
      <pre style={{ maxHeight: 500, overflow: 'auto', margin: 0 }}>
        {text}
      </pre>
        </Modal>
    );

    return { showJson, JsonModal };
};
