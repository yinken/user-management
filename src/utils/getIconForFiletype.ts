import { IconName } from '@fortawesome/fontawesome-svg-core';

export const getIconNameForFiletype = (filetype: string) => {
  const fileTypes: Record<string, IconName> = {
    'audio/mp3': 'file-audio',
    'audio/mpeg': 'file-audio',
    'audio/ogg': 'file-audio',
    'audio/wav': 'file-audio',
    'audio/x-wav': 'file-audio',
    'audio/webm': 'file-audio',
    'audio/x-m4a': 'file-audio',
    'audio/aac': 'file-audio',
    'video/mp4': 'file-video',
    'video/ogg': 'file-video',
    'video/webm': 'file-video',
    'video/quicktime': 'file-video',
    'video/x-msvideo': 'file-video',
    'video/x-ms-wmv': 'file-video',
    'application/pdf': 'file-pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      'file-word',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      'file-excel',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      'file-powerpoint',
    'application/vnd.ms-excel': 'file-excel',
    'application/vnd.ms-powerpoint': 'file-powerpoint',
    'application/msword': 'file-word',
    'application/zip': 'file-zipper',
    'application/x-rar-compressed': 'file-zipper',
    'application/x-7z-compressed': 'file-zipper',
    'application/x-tar': 'file-zipper',
    'application/x-gzip': 'file-zipper',
    'application/x-bzip2': 'file-zipper',
    'application/x-xz': 'file-zipper',
    'application/x-zstd': 'file-zipper',
  };

  const icon: IconName = fileTypes[filetype];
  if (icon) {
    return icon;
  } else {
    return 'file';
  }
};
