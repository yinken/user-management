import { throttle as lodashThrottle } from 'lodash';
import * as React from 'react';

enum SCROLL_DIRECTION {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
}

export type ScrollPosition = {
  top: number;
  left: number;
  isBottom: boolean;
  isTop: boolean;
  isLeft: boolean;
  isRight: boolean;
  direction: SCROLL_DIRECTION;
  hasScrollbar: boolean;
};

type Params = {
  element?: HTMLElement | null;
  delay?: number;
  callback?: (pos: ScrollPosition) => void;
  throttle?: boolean;
};

export const useScrolling = (params: Params) => {
  const [scrollPosition, setScrollPosition] = React.useState<ScrollPosition>({
    top: 0,
    left: 0,
    isBottom: false,
    isTop: true,
    isLeft: true,
    isRight: false,
    direction: SCROLL_DIRECTION.DOWN,
    hasScrollbar: false,
  });

  const { element, delay, callback, throttle = true } = params;

  React.useEffect(() => {
    if (!element) {
      return;
    }
    const threshold = 0;
    let lastScrollY = element.scrollTop;
    let lastScrollX = element.scrollLeft;
    let ticking = false;

    const throttledSetScrollPosition = lodashThrottle(
      (params: ScrollPosition) => {
        setScrollPosition({ ...params });
      },
      delay || 500,
      { leading: false }
    );

    const updateScrollDir = () => {
      const scrollY = element.scrollTop;
      const scrollX = element.scrollLeft;

      if (
        Math.abs(scrollY - lastScrollY) < threshold &&
        Math.abs(scrollX - lastScrollX) < threshold
      ) {
        ticking = false;
        return;
      }

      let direction = SCROLL_DIRECTION.DOWN;
      if (scrollY < lastScrollY) {
        direction = SCROLL_DIRECTION.UP;
      }
      if (scrollX < lastScrollX) {
        direction = SCROLL_DIRECTION.LEFT;
      }
      if (scrollX > lastScrollX) {
        direction = SCROLL_DIRECTION.RIGHT;
      }

      const pos = {
        top: scrollY,
        left: scrollX,
        isBottom:
          Math.ceil(element.scrollHeight) - Math.ceil(element.clientHeight) <=
          Math.ceil(scrollY),
        isTop: scrollY === 0,
        isLeft: scrollX === 0,
        isRight:
          Math.ceil(element.scrollWidth) - Math.ceil(element.clientWidth) <=
          Math.ceil(scrollX),
        direction: direction,
        hasScrollbar: element.scrollHeight > element.clientHeight,
      };

      if (callback) {
        callback(pos);
      }

      if (!throttle) {
        setScrollPosition(pos);
        lastScrollY = scrollY > 0 ? scrollY : 0;
        lastScrollX = scrollX > 0 ? scrollX : 0;
        ticking = false;
        return;
      }

      throttledSetScrollPosition(pos);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      lastScrollX = scrollX > 0 ? scrollX : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };
    element.addEventListener('scroll', onScroll);

    return () => {
      element.removeEventListener('scroll', onScroll);
    };
  }, [scrollPosition, element, delay, callback, throttle]);

  const scrollToBottom = React.useCallback(
    (behavior?: ScrollBehavior) => {
      if (!element) {
        return;
      }
      element.scrollTo({
        top: element.scrollHeight - element.clientHeight,
        behavior: behavior || 'smooth',
      });
    },
    [element]
  );

  const scrollToTop = React.useCallback(
    (behavior?: ScrollBehavior) => {
      if (!element) {
        return;
      }
      element.scrollTo({
        top: 0,
        behavior: behavior || 'smooth',
      });
    },
    [element]
  );

  const scrollTo = React.useCallback(
    (options: ScrollToOptions) => {
      if (!element) {
        return;
      }
      element.scrollTo(options);
    },
    [element]
  );

  return {
    scrollPosition,
    scrollToBottom,
    scrollToTop,
    scrollTo,
  };
};
