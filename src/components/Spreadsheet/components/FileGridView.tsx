import React from 'react';
import { Row, Col } from 'antd';
import type { ExcelFile, JsonFile } from '../types';
import { useResponsiveColumns } from '../hooks/useResponsiveColumns';
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
  const responsiveColumns = useResponsiveColumns();

  return (
    <Row gutter={[12, 12]}> {/* 减小间距从16到12 */}
      {files.map((file) => (
        <Col {...responsiveColumns} key={file.id}>
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
