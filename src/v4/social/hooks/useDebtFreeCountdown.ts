// FINEX: Create new useDebtFreeCountdown hook

import { useMemo } from 'react';
import { getDebtFreeCountdown } from '~/v4/helpers/utils';

export const useDebtFreeCountdown = ({ user }: { user?: Amity.User | null }) => {
  const debtFreeDate = user?.metadata?.debtFreeDate;
  const showDebtFreeCountdown = user?.metadata?.showDebtFreeCountdown;
  return useMemo(() => {
    return getDebtFreeCountdown(debtFreeDate, showDebtFreeCountdown);
  }, [debtFreeDate, showDebtFreeCountdown]);
};
