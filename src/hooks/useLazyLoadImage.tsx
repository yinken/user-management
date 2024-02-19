import * as React from 'react';
export const useLazyLoadImage = (
  image: string,
  defaultHeight = 220,
  defaultWidth = 360
) => {
  const placeholder =
    'https://timzon000.appspot.com/hub/themes/light/image_ph.png';
  const [loadState, setLoadState] = React.useState({
    src: placeholder,
    loaded: false,
    error: false,
    height: defaultHeight,
    width: defaultWidth,
  });

  React.useEffect(() => {
    const img = new Image();

    img.onload = function () {
      setLoadState({
        src: img.src,
        loaded: true,
        error: false,
        height: img.naturalHeight,
        width: img.naturalWidth,
      });
    };
    img.onerror = function () {
      setLoadState({
        src: placeholder,
        loaded: true,
        error: true,
        height: defaultHeight,
        width: defaultWidth,
      });
    };
    img.src = image;
  }, [defaultHeight, defaultWidth, image, placeholder]);

  return { loadState };
};
