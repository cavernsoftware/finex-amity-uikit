import React, { ComponentPropsWithoutRef } from 'react';
import styles from './Divider.module.css';
import clsx from 'clsx';

type DividerProps = ComponentPropsWithoutRef<'div'> & {
  isShown?: boolean;
  isShownOnlyInMobile?: boolean;
};

export function Divider({ isShown = true, isShownOnlyInMobile = false, className }: DividerProps) {
  return isShown ? (
    <div
      className={clsx(
        styles.divider,
        // FINEX: Implement isShownOnlyInMobile prop
        isShownOnlyInMobile && styles.divider__isShownOnlyInMobile,
        className,
      )}
    />
  ) : null;
}
