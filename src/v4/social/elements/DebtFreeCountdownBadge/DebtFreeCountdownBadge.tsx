// FINEX: Create new DebtFreeCountdownBadge component

import React from 'react';
import styles from './DebtFreeCountdownBadge.module.css';
import { useNavigation } from '~/v4/core/providers/NavigationProvider';

interface DebtFreeCountdownBadgeProps {
  userId?: string | null;
  daysLeft?: number | null;
}

export function DebtFreeCountdownBadge({ userId, daysLeft }: DebtFreeCountdownBadgeProps) {
  const { onClickUser } = useNavigation();

  if (!userId || !daysLeft) return null;

  return (
    <div className={styles.debtFreeCountdownBadge} onClick={() => onClickUser(userId)}>
      {daysLeft?.toLocaleString()} days left
    </div>
  );
}
