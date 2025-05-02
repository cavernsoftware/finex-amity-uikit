// FINEX: Create new DebtFreeCountdown component

import React from 'react';
import styles from './DebtFreeCountdown.module.css';
import { Typography } from '~/v4/core/components/Typography/Typography';

interface DebtFreeCountdownProps {
  daysLeft?: number | null;
}

export function DebtFreeCountdown({ daysLeft }: DebtFreeCountdownProps) {
  if (!daysLeft) return null;
  return (
    <div className={styles.debtFreeCountdown}>
      <Typography.BodyMedium>
        Debt-Free Countdown
      </Typography.BodyMedium>
      <Typography.BodyBold className={styles.debtFreeCountdown__daysLeft}>
        {daysLeft.toLocaleString()} days left
      </Typography.BodyBold>
    </div>
  );
}
