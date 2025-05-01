// FINEX: Create new DebtFreeCountdown component

import React from 'react';
import styles from './DebtFreeCountdown.module.css';
import { Typography } from '~/v4/core/components/Typography/Typography';
import { useDebtFreeCountdown } from '~/v4/social/hooks/useDebtFreeCountdown';

interface DebtFreeCountdownProps {
  user?: Amity.User | null;
}

export function DebtFreeCountdown({ user }: DebtFreeCountdownProps) {
  const debtFreeDaysLeft = useDebtFreeCountdown({ user });

  if (!debtFreeDaysLeft) return null;

  return (
    <div className={styles.debtFreeCountdown}>
      <Typography.BodyMedium>
        Debt-Free Countdown
      </Typography.BodyMedium>
      <Typography.BodyBold className={styles.debtFreeCountdown__daysLeft}>
        {debtFreeDaysLeft.toLocaleString()} days left
      </Typography.BodyBold>
    </div>
  );
}
