import { IMAGE_RATIO } from '@/components/image/Image';
import * as React from 'react';

export const useGetImageRatio = (
  imageWidth: number,
  imageHeight: number
): IMAGE_RATIO => {
  const [imageRatio, setImageRatio] = React.useState<IMAGE_RATIO>(
    IMAGE_RATIO.LONG
  );

  React.useEffect(() => {
    let ratio = IMAGE_RATIO.LONG;
    if (imageWidth === imageHeight) {
      ratio = IMAGE_RATIO.SQUARE;
    }
    if (imageWidth > imageHeight) {
      ratio = IMAGE_RATIO.LONG;
    }
    if (imageWidth > 4 * imageHeight) {
      ratio = IMAGE_RATIO.VERY_LONG;
    }
    if (imageHeight > imageWidth) {
      ratio = IMAGE_RATIO.TALL;
    }
    if (imageHeight > 4 * imageWidth) {
      ratio = IMAGE_RATIO.VERY_TALL;
    }

    setImageRatio(ratio);
  }, [imageWidth, imageHeight]);

  return imageRatio;
};
