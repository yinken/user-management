import * as React from 'react';
import { ReactCropperElement } from 'react-cropper';
import { useTranslation } from 'react-i18next';
import { ICON } from '../icon/useIcon';

type Params = {
  initialImage: string;
  cropperRef: React.RefObject<ReactCropperElement>;
  fileUploadRef: React.RefObject<HTMLInputElement>;
  onSave: (dataUrl: string) => void;
};

export type EditorAction = {
  name: string;
  icon: ICON;
  onClick: () => void;
  title?: string;
};

export const useImageEditor = (params: Params) => {
  const { t } = useTranslation();
  const { initialImage, cropperRef, fileUploadRef, onSave } = params;

  const handleSave = React.useCallback(() => {
    const cropper = cropperRef.current?.cropper;
    const data = cropper?.getCroppedCanvas().toDataURL() || '';
    onSave(data);
  }, [cropperRef, onSave]);

  const handleCancel = React.useCallback(() => {
    onSave(initialImage);
  }, [initialImage, onSave]);

  const handleReplace = React.useCallback(() => {
    fileUploadRef.current?.click();
  }, [fileUploadRef]);

  const handleDelete = React.useCallback(() => {
    onSave('');
  }, [onSave]);

  const handleFileUpload = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) {
        return;
      }

      const cropper = cropperRef.current?.cropper;
      if (!cropper) {
        return;
      }
      cropper.replace(URL.createObjectURL(file), false);
    },
    [cropperRef]
  );

  const handleRotate = React.useCallback(
    (degree: number) => {
      const cropper = cropperRef.current?.cropper;
      if (!cropper) {
        return;
      }
      cropper.rotate(degree);
    },
    [cropperRef]
  );

  const handleReset = React.useCallback(() => {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) {
      return;
    }
    cropper.reset();
  }, [cropperRef]);

  const actions: Record<string, EditorAction[]> = React.useMemo(() => {
    return {
      editing: [
        {
          name: 'rotate-left',
          icon: ICON.ROTATE_LEFT,
          onClick: () => handleRotate(-90),
          title: t('Rotate Left') as string,
        },
        {
          name: 'reset',
          icon: ICON.RESET,
          onClick: handleReset,
          title: t('Reset') as string,
        },
        {
          name: 'rotate-right',
          icon: ICON.ROTATE_RIGHT,
          onClick: () => handleRotate(90),
          title: t('Rotate Right') as string,
        },
      ],
      system: [
        {
          name: 'save',
          icon: ICON.CHECKED,
          onClick: handleSave,
          title: t('Save') as string,
        },
        {
          name: 'cancel',
          icon: ICON.CANCEL,
          onClick: handleCancel,
          title: t('Cancel') as string,
        },
      ],
      file: [
        {
          name: 'replace',
          icon: ICON.UPLOAD,
          onClick: handleReplace,
          title: t('Upload') as string,
        },
        {
          name: 'delete',
          icon: ICON.DELETE,
          onClick: handleDelete,
          title: t('Delete') as string,
        },
      ],
    };
  }, [
    handleCancel,
    handleDelete,
    handleReplace,
    handleReset,
    handleRotate,
    handleSave,
    t,
  ]);
  return {
    actions,
    handleFileUpload,
  };
};
