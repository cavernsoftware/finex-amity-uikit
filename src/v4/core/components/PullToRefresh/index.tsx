import React, {
  ComponentPropsWithRef,
  forwardRef,
  PropsWithChildren,
  Ref,
  useRef,
  useState,
} from 'react';
import { RefreshSpinner } from '~/v4/icons/RefreshSpinner';
import styles from './styles.module.css';

type PullToRefreshProps = ComponentPropsWithRef<'div'> &
  PropsWithChildren<{
    className?: string;
    accessibilityId?: string;
    style?: React.CSSProperties;
    onTouchEndCallback?: () => void;
  }>;

export const PullToRefresh = forwardRef(function (
  { style, children, className, accessibilityId, onTouchEndCallback }: PullToRefreshProps,
  ref: Ref<HTMLDivElement>,
) {
  const touchStartY = useRef(0);
  const [touchDiff, setTouchDiff] = useState(0);

  // FINEX: Add isAtTop function to check if user is at the top of the page
  const isAtTop = () => {
    return window.scrollY <= 0;
  };

  return (
    <div
      ref={ref}
      style={style}
      className={className}
      data-testid={accessibilityId}
      onDrag={(event) => event.stopPropagation()}
      // FINEX: Refactor functions below to prevent touch events from being triggered when scrolling up normally
      // onTouchStart={(event) => {
      //   touchStartY.current = event.touches[0].clientY;
      // }}
      // onTouchMove={(event) => {
      //   const touchY = event.touches[0].clientY;
      //   if (touchStartY.current > touchY) return;
      //   setTouchDiff(Math.min(touchY - touchStartY.current, 100));
      // }}
      // onTouchEnd={() => {
      //   touchStartY.current = 0;
      //   if (touchDiff >= 75) onTouchEndCallback?.();
      //   setTouchDiff(0);
      // }}
      // FINEX: Refactor onTouchStart
      onTouchStart={(event) => {
        if (!isAtTop()) return;
        touchStartY.current = event.touches[0].clientY;
      }}
      // FINEX: Refactor onTouchMove
      onTouchMove={(event) => {
        if (!isAtTop() || touchStartY.current === 0) return;
        const touchY = event.touches[0].clientY;
        if (touchStartY.current > touchY) {
          setTouchDiff(0);
          return;
        }
        setTouchDiff(Math.min(touchY - touchStartY.current, 100));
      }}
      // FINEX: Refactor onTouchEnd
      onTouchEnd={() => {
        if (touchDiff >= 75 && isAtTop()) onTouchEndCallback?.();
        touchStartY.current = 0;
        setTouchDiff(0);
      }}
    >
      <div
        className={styles.pullToRefresh}
        style={{ '--asc-pull-to-refresh-height': `${touchDiff}px` } as React.CSSProperties}
      >
        <RefreshSpinner className={styles.pullToRefresh__spinner} />
      </div>
      {children}
    </div>
  );
});
