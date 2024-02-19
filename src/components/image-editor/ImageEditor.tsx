import * as React from 'react';
import { Cropper, ReactCropperElement } from 'react-cropper';
import styled from 'styled-components';
import { Button } from '../button/Button';
import { FlexColumn, FlexGrid, FlexRow } from '../flex-grid/FlexGrid';
import { EditorAction, useImageEditor } from './useImageEditor';
import { useIcon } from '../icon/useIcon';

interface ImageEditorProps {
  initialImage: string;
  height?: string;
  width?: string;
  onSave: (dataUrl: string) => void;
}

const StyledImageEditor = styled(FlexGrid)``;

export const ImageEditor: React.FC<ImageEditorProps> = ({
  initialImage,
  width,
  height,
  onSave,
}) => {
  const { i } = useIcon();
  const cropperRef = React.useRef<ReactCropperElement>(null);
  const fileUploadRef = React.useRef<HTMLInputElement>(null);

  const { actions, handleFileUpload } = useImageEditor({
    initialImage,
    cropperRef,
    fileUploadRef,
    onSave,
  });

  const buildActions = (actionList: EditorAction[]) => {
    return actionList.map((action, index) => {
      const { title, icon, onClick } = action;
      return (
        <Button
          key={index}
          onClick={onClick}
          variant='tertiary'
          hasBorder={false}
          isSquare={true}
          isRounded={false}
          title={title}
        >
          {i(icon)}
        </Button>
      );
    });
  };

  return (
    <StyledImageEditor
      alignItems='center'
      direction='column'
    >
      <input
        style={{ display: 'none' }}
        type='file'
        ref={fileUploadRef}
        onChange={handleFileUpload}
      />
      <FlexRow>
        <Cropper
          src={initialImage}
          style={{ height, width }}
          initialAspectRatio={1}
          rotatable={true}
          aspectRatio={1}
          viewMode={1}
          guides={false}
          ref={cropperRef}
        />
      </FlexRow>

      <FlexRow
        grow={0}
        shrink={0}
        direction='row'
        justifyContent='space-between'
      >
        <FlexColumn
          grow={0}
          direction='row'
        >
          {buildActions(actions.system)}
        </FlexColumn>
        <FlexColumn
          grow={0}
          direction='row'
        >
          {buildActions(actions.editing)}
        </FlexColumn>
        <FlexColumn
          grow={0}
          direction='row'
        >
          {buildActions(actions.file)}
        </FlexColumn>
      </FlexRow>
    </StyledImageEditor>
  );
};
