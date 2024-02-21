
import * as React from 'react';
import styled from 'styled-components';
import { FlexGrid, FlexRow } from '../flex-grid/FlexGrid';
import { TitleBar } from '../title-bar/TitleBar';
import Resizer from '../resizer/Resizer';
import { SidebarAction } from './useSidebar';
import { colors, hexToRgba } from '@/utils/colors';
import { useStore } from '@/store/application';
import { space } from '@/utils/space';
import { ICON } from '../icon/useIcon';

interface SidebarProps {
  position: 'left' | 'right';
  isVisible?: boolean;
  isExpanded?: boolean;
  children: React.ReactNode;
  width: number;
  title?: string;
  icon?: ICON;
  actions?: SidebarAction[];
  offset?: {
    top: string | number;
    bottom: string | number;
  };

  componentRef?: React.RefObject<HTMLDivElement>;
  onSizeChange?: (size: number) => void;
}

const StyledSidebar = styled.div<SidebarProps>`
  position: fixed;
  top: ${({ offset }) => (offset?.top ? offset.top : 0)};
  bottom: ${({ offset }) => (offset?.bottom ? offset.bottom : 0)};
  width: ${({ width }) => `${width}px`};
  background-color: var(--bg-base-2);
  z-index: 1000;

  ${({ position }) => position}: 0;
  transform: ${({ isVisible, position }) =>
    isVisible
      ? 'translateX(0)'
      : `translateX(${position === 'left' ? '-' : ''}100%)`};

  pointer-events: all;
  .sidebar-content {
    padding: 0;
  }
  box-shadow: ${({ isVisible, position }) => {
    if (!isVisible) {
      return 'none';
    }
    if (position === 'left') {
      return `0 0 5px ${hexToRgba(colors.black, 0.2)}`;
    }
    return `-5px 0 5px ${hexToRgba(colors.black, 0.2)}`;
  }};
  border: ${({ isVisible, position }) => {
    if (!isVisible) {
      return 'none';
    }
    if (position === 'left') {
      return `1px solid var(--color-border-2)`;
    }
    return `1px solid var(--color-border-2)`;
  }};
  transition: transform 0.25s ease-in-out;
`;

export const Sidebar: React.FC<SidebarProps> = ({
  position,
  isVisible = false,
  isExpanded = false,
  children,
  actions,
  title,
  icon,
  offset = {
    top: 0,
    bottom: 0,
  },
  width,
  onSizeChange,
}) => {
  const sidebarRef = React.useRef<HTMLDivElement>(null);
  const setSidebarRef = useStore.use.setSidebarRef();

  React.useEffect(() => {
    if (sidebarRef.current) {
      setSidebarRef(sidebarRef);
    }
  }, [setSidebarRef]);

  return (
    <StyledSidebar
      ref={sidebarRef}
      position={position}
      isVisible={isVisible}
      isExpanded={isExpanded}
      width={width}
      offset={offset}
    >
      <FlexGrid
        direction='column'
        style={{
          position: 'relative',
          borderBottom: `1px solid var(--color-border-2)`,
        }}
      >
        <Resizer
          axis='y'
          position={{ x: position === 'right' ? 'left' : 'right', y: 'top' }}
          onChange={(change) => {
            onSizeChange?.(change);
          }}
          size={{
            base: width,
            min: width / 3,
            max: width * 2,
          }}
        />
        {title && (
          <FlexRow
            grow={0}
            style={{
              borderBottom: `1px solid var(--color-border-2)`,
            }}
          >
            <TitleBar
              icon={icon}
              title={title}
              actions={actions}
            />
          </FlexRow>
        )}
        <FlexRow
          grow={0}
          gap={space(0.25)}
        ></FlexRow>
        <FlexRow
          className='sidebar-content'
          style={{
            overflowY: 'auto',
          }}
        >
          {children}
        </FlexRow>
      </FlexGrid>
    </StyledSidebar>
  );
};
