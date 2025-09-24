import { Row, Col } from 'antd';
import type { ExcelFile, JsonFile } from '../types';
import { useResponsiveColumns } from '../hooks/useResponsiveColumns';
import FileCard from "./FileCard.tsx";
import {FileExcelOutlined, FileTextOutlined} from "@ant-design/icons";
import {FileAction, FileType} from "../hooks/useFileActions.ts";

interface FileGridViewProps<T extends ExcelFile | JsonFile> {
  files: T[];
  fileType: FileType;
  onAction: (action: FileAction, fileName: ExcelFile | JsonFile) => void;
}

function FileGridView<T extends ExcelFile | JsonFile>({ 
  files, 
  fileType, 
  onAction 
}: FileGridViewProps<T>) {
  const responsiveColumns = useResponsiveColumns();

  return (
    <Row gutter={[12, 12]}> {/* 减小间距从16到12 */}
      {files.map((file) => (
        <Col {...responsiveColumns} key={file.id}>
          {fileType === 'excel' ? (
              <FileCard
                  icon = {<FileExcelOutlined style={{fontSize: '16px',color: '#52c41a'}} />}
                  file={file as ExcelFile}
                  onAction={onAction} />
          ) : (
              <FileCard
                  icon = {<FileTextOutlined style={{fontSize: '16px',color: '#1677ff'}} />}
                  file= {file as JsonFile}
                  onAction = {onAction} />
          )}
        </Col>
      ))}
    </Row>
  );
}

export default FileGridView;
