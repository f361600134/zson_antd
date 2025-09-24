import React, {ReactNode} from 'react';
import {Card, Typography, Tooltip} from 'antd';
import type { ExcelFile } from '../types';
import { FILE_CARD_STYLE, FILE_CARD_HOVER_STYLE } from '../constants';
import FileActionMenu from './FileActionMenu';
import {useThemeStore} from "../../../store/themeStore.ts";
import {FileAction} from "../hooks/useFileActions.ts";
const { Paragraph } = Typography;

interface FileCardProps {
  file: ExcelFile;
  icon: ReactNode,
  onAction: (action: FileAction, file: ExcelFile) => void;
}

const FileCard: React.FC<FileCardProps> = ({ file, icon, onAction }) => {
  const { themeConfig } = useThemeStore();

  // const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    Object.assign(card.style, FILE_CARD_HOVER_STYLE);
    card.style.borderColor = themeConfig.colorPrimary;
    // card.style.height = '130px';
    const actions = card.querySelector('.file-actions') as HTMLElement;
    if (actions) actions.style.opacity = '1';
    // setIsHovered(true);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = 'scale(1)';
    card.style.boxShadow = '';
    card.style.borderColor = '';
    // card.style.height = '120px';
    const actions = card.querySelector('.file-actions') as HTMLElement;
    if (actions) actions.style.opacity = '0';
    // setIsHovered(false);
  };

  return (
      <Tooltip title={file.name} placement={"bottom"}>
        <Card
            style={FILE_CARD_STYLE}
            bodyStyle={{
              padding: '12px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
            className="file-card"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{  marginBottom: '12px' }}>
              {icon}
            </div>

            <div style={{ flex: 1 }}>
              <Paragraph strong style={{
                margin: 0,
                fontSize: '12px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                minHeight: '40px'
              }}
             ellipsis={{ rows: 2 }}
              >
                {(file.name)}
              </Paragraph>

              <div style={{ fontSize: '10px', color: '#8c8c8c' }}>
                <div style={{ marginBottom: '4px' }}>
                  {file.updateTime}
                </div>
              </div>
            </div>
          </div>

          <FileActionMenu file={file} onAction={onAction} />
        </Card>
      </Tooltip>
  );
};

export default FileCard;
