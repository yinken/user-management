import * as React from "react";
import styled from "styled-components";

import Icon from "../icon/Icon";
import { Button } from "../button/Button";
import { ICON, useIcon } from "../icon/useIcon";
import { colors, hexToRgba } from "@/utils/colors";
import { space } from "@/utils/space";
import { getIconNameForFiletype } from "@/utils/getIconForFiletype";
import { Image } from "../image/Image";
import { FlexColumn, FlexGrid, FlexRow } from "../flex-grid/FlexGrid";
import { Text } from "../text/Text";

export type FileAction = {
  name: string;
  title?: string;
  onClick: () => void;
  icon: ICON;
  disabled?: boolean;
};

type File = {
  mimeType: string;
  fileName: string;
  url: string;
};

interface FileProps {
  file: File;
  actions?: FileAction[];
  onPreviewClick?: (file: File) => void;
  showPreview?: boolean;
  animate?: boolean;
}

const StyledFile = styled.div<{ animate: boolean }>`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  ${({ animate }) =>
    animate &&
    `
  &:hover {
    .file-control {
      transform: translateY(0);
    }
  }
  `}

  .file-preview {
    position: absolute;
    inset: 0;
    z-index: 1;
    > button {
      border: 0;
      padding: 0;
      background: ${colors.transparent};
      cursor: pointer;
    }
    > button,
    > div {
      > * {
        width: 100%;
        object-fit: contain;
      }
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    div {
      &.audio {
        padding: 32px 48px 0px 48px;
        audio {
          max-width: 320px;
        }
      }
      &.video {
        padding: 0px 48px;
        video {
          max-width: 1280px;
        }
      }
    }
  }
  .file-control {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 2;
    background: ${hexToRgba("var(--bg-base-3)", 0.4)};
    padding: ${space(0.25)};
    backdrop-filter: blur(2px);
    transition: transform 0.2s ease-in-out;
    ${({ animate }) => animate && `transform: translateY(100%);`}
  }
`;

export const File: React.FC<FileProps> = ({
  file,
  actions,
  onPreviewClick,
  showPreview = true,
  animate = true,
}) => {
  const { i } = useIcon();

  const renderFilePreview = (file: File) => {
    let previewComponent = (
      <Icon size="2x" icon={getIconNameForFiletype(file.mimeType)} />
    );

    if (file.mimeType.includes("image") && showPreview) {
      previewComponent = <Image src={file.url} alt="" />;
    } else if (file.mimeType.includes("video") && showPreview) {
      previewComponent = (
        <video controls>
          <source src={file.url} type={file.mimeType} />
        </video>
      );
    } else if (file.mimeType.includes("audio") && showPreview) {
      previewComponent = (
        <audio controls>
          <source src={file.url} type={file.mimeType} />
        </audio>
      );
    }

    const Element = onPreviewClick ? "button" : "div";

    return (
      <Element
        onClick={onPreviewClick ? () => onPreviewClick(file) : undefined}
        className={file.mimeType.split("/").shift()}
      >
        {previewComponent}
      </Element>
    );
  };
  return (
    <StyledFile title={`${file.mimeType}: ${file.fileName}`} animate={animate}>
      <div className="file-preview">{renderFilePreview(file)}</div>
      <div className="file-control">
        <FlexGrid direction="column" gap={space(0.25)}>
          <FlexRow>
            <Text size="XXS" ellipsis>
              {file.fileName}
            </Text>
          </FlexRow>
          <FlexRow justifyContent="center" alignItems="center">
            <FlexGrid gap={space(0.25)}>
              {actions?.map((action, index) => {
                return (
                  <FlexColumn
                    justifyContent="center"
                    alignItems="center"
                    grow={0}
                    key={index}
                  >
                    <Button
                      onClick={action.onClick}
                      isSquare
                      disabled={action.disabled}
                      title={action.title}
                      variant="tertiary"
                      hasBorder={false}
                    >
                      {i(action.icon)}
                    </Button>
                  </FlexColumn>
                );
              })}
            </FlexGrid>
          </FlexRow>
        </FlexGrid>
      </div>
    </StyledFile>
  );
};
