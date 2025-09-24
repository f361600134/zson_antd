import { Row, Col } from 'antd';
import type { ExcelFile, JsonFile } from '../types';
import ExcelFileCard from './ExcelFileCard';
import JsonFileCard from './JsonFileCard';

interface FileGridViewProps<T extends ExcelFile | JsonFile> {
  files: T[];
  fileType: 'excel' | 'json';
  onAction: (action: string, fileName: string) => void;
}

function FileGridView<T extends ExcelFile | JsonFile>({ 
  files, 
  fileType, 
  onAction 
}: FileGridViewProps<T>) {
  return (
    <Row gutter={[16, 16]}>
      {files.map((file) => (
        <Col xs={24} sm={12} md={8} lg={6} key={file.id}>
          {fileType === 'excel' ? (
            <ExcelFileCard 
              file={file as ExcelFile} 
              onAction={onAction} 
            />
          ) : (
            <JsonFileCard 
              file={file as JsonFile} 
              onAction={onAction} 
            />
          )}
        </Col>
      ))}
    </Row>
  );
}

export default FileGridView;
