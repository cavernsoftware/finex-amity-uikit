import React, { ReactNode, useMemo } from 'react';
import BanIcon from '~/icons/Ban';
import { backgroundImage as userHeaderBackgroundImage } from '~/icons/User';

import {
  UserHeaderAvatar,
  UserHeaderContainer,
  UserHeaderSubtitle,
  UserHeaderTitle,
  DebtPayoffDaysLeft,
  UserNameContainer,
} from './styles';
import { useCustomComponent } from '~/core/providers/CustomComponentsProvider';
import { BrandBadge } from '~/v4/social/internal-components/BrandBadge/BrandBadge';
import { getDebtPayoffCountdown } from '~/helpers/utils';

interface UIUserHeaderProps {
  userId?: string | null;
  debtPayoffDate?: string | null;
  displayName?: string | null;
  avatarFileUrl?: string | null;
  children?: ReactNode;
  isBanned?: boolean;
  isBrand?: boolean;
  onClick?: (userId: string) => void;
}

const UIUserHeader = ({
  userId,
  displayName,
  debtPayoffDate,
  avatarFileUrl,
  children,
  onClick,
  isBanned,
  isBrand,
}: UIUserHeaderProps) => {
  const onClickUser = () => userId && onClick?.(userId);

  const debtFreeDaysLeft = useMemo(() => {
    if (!debtPayoffDate) return null;
    return getDebtPayoffCountdown(debtPayoffDate);
  }, [debtPayoffDate]);

  return (
    <UserHeaderContainer $noSubtitle={!!children}>
      <UserHeaderAvatar
        avatar={avatarFileUrl}
        backgroundImage={userHeaderBackgroundImage}
        onClick={onClickUser}
      />
      <UserNameContainer>
        <UserHeaderTitle title={userId || undefined} onClick={onClickUser}>
          <div>{displayName}</div> {isBanned && <BanIcon width={14} height={14} />}{' '}
          {isBrand && <BrandBadge />}
        </UserHeaderTitle>
        {debtFreeDaysLeft !== null && (
          <DebtPayoffDaysLeft onClick={onClickUser}>
            {debtFreeDaysLeft.toLocaleString()} days left
          </DebtPayoffDaysLeft>
        )}
      </UserNameContainer>
      {children && <UserHeaderSubtitle>{children}</UserHeaderSubtitle>}
    </UserHeaderContainer>
  );
};

export default (props: UIUserHeaderProps) => {
  const CustomComponentFn = useCustomComponent<UIUserHeaderProps>('UserHeader');

  if (CustomComponentFn) return CustomComponentFn(props);

  return <UIUserHeader {...props} />;
};
