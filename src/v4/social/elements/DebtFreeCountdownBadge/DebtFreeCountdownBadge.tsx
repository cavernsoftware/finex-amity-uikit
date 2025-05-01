// FINEX: Create new DebtFreeCountdownBadge component

import React, { useMemo } from 'react';
import styles from './DebtFreeCountdownBadge.module.css';
import { getDebtFreeCountdown } from '~/v4/helpers/utils';
import { useNavigation } from '~/v4/core/providers/NavigationProvider';

interface DebtFreeCountdownBadgeProps {
  user?: Amity.User | null;
}

export function DebtFreeCountdownBadge({ user }: DebtFreeCountdownBadgeProps) {
  const debtFreeDate = user?.metadata?.debtFreeDate;
  const showDebtFreeCountdown = user?.metadata?.showDebtFreeCountdown;
  const userId = user?.userId;

  const { onClickUser } = useNavigation();

  const debtFreeDaysLeft = useMemo(() => {
    return getDebtFreeCountdown(debtFreeDate, showDebtFreeCountdown);
  }, [debtFreeDate, showDebtFreeCountdown]);

  if (!debtFreeDaysLeft || !userId) return null;

  return (
    <div className={styles.debtFreeCountdownBadge}>
      <div className={styles.debtFreeCountdownBadge__badge} onClick={() => onClickUser(userId)}>
        {debtFreeDaysLeft.toLocaleString()} days left
      </div>
      <span className={styles.debtFreeCountdownBadge__separator}>•</span>
    </div>
  );
}
