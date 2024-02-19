export const getPreviousSibling = (el: HTMLElement, selector: string) => {
  // Get the next sibling element
  let sibling = el.previousElementSibling;

  // If there's no selector, return the first sibling
  if (!selector) return sibling;

  // If the sibling matches our selector, use it
  // If not, jump to the previous sibling and continue the loop
  while (sibling) {
    if (sibling.matches(selector)) return sibling;
    sibling = sibling.previousElementSibling;
  }
};

export const highlightElement = (selector?: string) => {
  const highlightedFrames = document.querySelectorAll('.highlighting-frame');
  highlightedFrames.forEach((frame) => {
    frame.remove();
  });
  if (!selector) {
    return;
  }
  const element = document.querySelector(`[data-tutorial='${selector}']`);

  if (!element) {
    return;
  }

  const buttonRect = element.getBoundingClientRect();

  const highlightingFrame = document.createElement('div');
  highlightingFrame.classList.add('highlighting-frame');

  const style = {
    border: '2px solid red',
    position: 'absolute',
    zIndex: '4000',
    borderRadius: '4px',
    pointerEvents: 'none',
    top: `${buttonRect?.top - 4}px`,
    left: `${buttonRect?.left - 4}px`,
    width: `${buttonRect?.width + 8}px`,
    height: `${buttonRect?.height + 8}px`,
    animation: 'tutorial 1s infinite',
  };

  Object.assign(highlightingFrame.style, style);

  document.body.appendChild(highlightingFrame);
};

export const getPopoverPosition = (
  parent?: HTMLElement | null,
  popover?: HTMLElement | null,
  preference?: 'top' | 'bottom'
) => {
  const defaultRect = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: 0,
    height: 0,
  };

  if (!parent || !popover)
    return {
      top: 0,
      left: 0,
      width: 0,
    };

  const parentRect = parent?.getBoundingClientRect() || defaultRect;
  const popoverRect = popover?.getBoundingClientRect() || defaultRect;
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  // Check if there's enough space below the button. If not, place the options above the button.
  const top =
    parentRect.bottom + popoverRect.height > windowHeight
      ? parentRect.top - popoverRect.height
      : parentRect.bottom;

  // Check if there's enough space to the right of the button. If not, align the right edges of the options and the button.
  const left =
    parentRect.right + popoverRect.width > windowWidth
      ? parentRect.left - popoverRect.width + parentRect.width
      : parentRect.left;
  const width = parentRect.width || 0;

  if (preference === 'top') {
    return {
      top: parentRect.top - popoverRect.height,
      left,
      width,
    };
  }

  return {
    top,
    left,
    width,
  };
};
