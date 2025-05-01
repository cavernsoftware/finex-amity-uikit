// FINEX: Create new DebtFreeCountdown component

import React, { useMemo } from 'react';
import styles from './DebtFreeCountdown.module.css';
import clsx from 'clsx';
import { Typography } from '~/v4/core/components/Typography/Typography';
import { getDebtFreeCountdown } from '~/v4/helpers/utils';

interface DebtFreeCountdownProps {
  user?: Amity.User | null;
}

export function DebtFreeCountdown({ user }: DebtFreeCountdownProps) {
  const debtFreeDate = user?.metadata?.debtFreeDate;
  const showDebtFreeCountdown = user?.metadata?.showDebtFreeCountdown;

  const debtFreeDaysLeft = useMemo(() => {
    return getDebtFreeCountdown(debtFreeDate, showDebtFreeCountdown);
  }, [debtFreeDate, showDebtFreeCountdown]);

  if (!debtFreeDaysLeft) return null;

  return (
    <div className={clsx(styles.debtFreeCountdown)}>
      <Typography.BodyMedium>
        Debt-Free Countdown
      </Typography.BodyMedium>
      <Typography.BodyBold className={styles.debtFreeCountdown__daysLeft}>
        {debtFreeDaysLeft.toLocaleString()} days left
      </Typography.BodyBold>
    </div>
  );
}
