import React, { useMemo } from 'react';
import { format } from 'date-fns';
import Truncate from 'react-truncate-markup';
import millify from 'millify';
import { FormattedMessage, useIntl } from 'react-intl';

import Button, { PrimaryButton } from '~/core/components/Button';

import { backgroundImage as UserImage } from '~/icons/User';

import BanIcon from '~/icons/Ban';

import {
  Avatar,
  Container,
  ProfileName,
  Header,
  Description,
  PlusIcon,
  PencilIcon,
  PendingIcon,
  OptionMenu,
  CountContainer,
  ClickableCount,
  PendingNotification,
  NotificationTitle,
  NotificationBody,
  TitleEllipse,
  PendingIconContainer,
  ActionButtonContainer,
  ProfileNameWrapper,
  ProfileInfo,
  DebtFreeCountdownContainer,
  DebtFreeCountdownLabel,
  DebtFreeCountdownDaysLeft,
  DebtFreeCountdownDate,
} from './styles';

import { isNonNullable, getDebtFreeCountdown } from '~/helpers/utils';
import useUser from '~/core/hooks/useUser';
import { useCustomComponent } from '~/core/providers/CustomComponentsProvider';
import useUserFlaggedByMe from '~/social/hooks/useUserFlaggedByMe';
import useFollowersCollection from '~/core/hooks/collections/useFollowersCollection';
import { useConfirmContext } from '~/core/providers/ConfirmProvider';

interface UIUserInfoProps {
  userId?: string | null;
  currentUserId?: string | null;
  fileUrl?: string;
  displayName?: string;
  debtFreeDate?: string;
  showDebtFreeCountdown?: boolean;
  description?: string;
  isMyProfile?: boolean;
  onEditUser?: (userId: string) => void;
  onFollowRequest?: () => void;
  onUnFollow?: () => void;
  onFollowDecline?: () => void | Promise<void>;
  isFollowPending?: boolean;
  isFollowNone?: boolean;
  isFollowAccepted?: boolean;
  onPendingNotificationClick?: () => void;
  onFollowingCountClick?: () => void;
  onFollowerCountClick?: () => void;
  onReportClick?: () => void;
  followerCount?: number;
  followingCount?: number;
  isPrivateNetwork?: boolean;
  isFlaggedByMe?: boolean;
}

const UIUserInfo = ({
  userId,
  currentUserId,
  fileUrl,
  displayName,
  debtFreeDate,
  showDebtFreeCountdown,
  description,
  isMyProfile,
  onEditUser,
  onFollowRequest,
  onFollowDecline,
  onUnFollow,
  onPendingNotificationClick,
  onFollowingCountClick,
  onFollowerCountClick,
  onReportClick,
  isFollowPending,
  isFollowNone,
  isFollowAccepted,
  followerCount = 0,
  followingCount = 0,
  isPrivateNetwork,
}: UIUserInfoProps) => {
  const user = useUser(userId);
  const { formatMessage } = useIntl();
  const { isFlaggedByMe } = useUserFlaggedByMe(userId || undefined);
  const { confirm } = useConfirmContext();

  const { followers: pendingUsers } = useFollowersCollection({
    userId: currentUserId,
    status: 'pending',
  });

  const title = user?.displayName
    ? formatMessage({ id: 'user.unfollow.confirm.title' }, { displayName: user.displayName })
    : formatMessage({ id: 'user.unfollow.confirm.title.thisUser' });

  const content = user?.displayName
    ? formatMessage({ id: 'user.unfollow.confirm.body' }, { displayName: user.displayName })
    : formatMessage({ id: 'user.unfollow.confirm.body.thisUser' });

  const allOptions: Array<{ name: string; action: () => void }> = [
    isFollowAccepted && !isMyProfile
      ? {
          name: formatMessage({ id: 'user.unfollow' }),
          action: () =>
            confirm({
              title,
              content,
              cancelText: formatMessage({ id: 'buttonText.cancel' }),
              okText: formatMessage({ id: 'buttonText.unfollow' }),
              onOk: async () => {
                await onUnFollow?.();
              },
            }),
        }
      : undefined,
    !isMyProfile
      ? {
          name: isFlaggedByMe
            ? formatMessage({ id: 'report.unreportUser' })
            : formatMessage({ id: 'report.reportUser' }),
          action: () => {
            onReportClick?.();
          },
        }
      : undefined,
  ].filter(isNonNullable);

  const debtFreeDaysLeft = useMemo(() => {
    return getDebtFreeCountdown(debtFreeDate, showDebtFreeCountdown);
  }, [debtFreeDate, showDebtFreeCountdown]);

  const debtFreeDateFormatted = useMemo(() => {
    if (!debtFreeDate) return null;
    return format(debtFreeDate, 'MMMM d, yyyy');
  }, [debtFreeDate]);

  return (
    <Container data-qa-anchor="user-info">
      <Header>
        <Avatar
          data-qa-anchor="user-info-profile-image"
          avatar={fileUrl}
          backgroundImage={UserImage}
        />

        <ProfileInfo>
          <ProfileNameWrapper>
            <Truncate lines={3}>
              <ProfileName data-qa-anchor="user-info-profile-name">{displayName}</ProfileName>
            </Truncate>

            {user?.isGlobalBanned ? (
              <BanIcon
                width={18}
                height={18}
                style={{ marginLeft: '0.265rem', marginTop: '1px' }}
              />
            ) : null}
          </ProfileNameWrapper>
          {debtFreeDaysLeft !== null && (
            <DebtFreeCountdownContainer>
              <DebtFreeCountdownLabel>
                <FormattedMessage id="user.debtFreeCountdown" />
              </DebtFreeCountdownLabel>
              <DebtFreeCountdownDaysLeft>
                {debtFreeDaysLeft.toLocaleString()} <FormattedMessage id="user.daysLeft" />
              </DebtFreeCountdownDaysLeft>
              {/* <DebtFreeCountdownDate>{debtFreeDateFormatted}</DebtFreeCountdownDate> */}
            </DebtFreeCountdownContainer>
          )}
          <CountContainer>
            <ClickableCount
              onClick={() => {
                // setActiveTab(UserFeedTabs.FOLLOWERS);
                // setTimeout(() => setFollowActiveTab(FollowersTabs.FOLLOWINGS), 250);
                onFollowingCountClick?.();
              }}
            >
              {millify(followingCount)}
            </ClickableCount>
            <FormattedMessage id="counter.followings" />
            <ClickableCount
              onClick={() => {
                onFollowerCountClick?.();
                // setActiveTab(UserFeedTabs.FOLLOWERS);
                // setTimeout(() => setFollowActiveTab(FollowersTabs.FOLLOWERS), 250);
              }}
            >
              {millify(followerCount)}
            </ClickableCount>
            <FormattedMessage id="counter.followers" />
          </CountContainer>
          <Description data-qa-anchor="user-info-description">{description}</Description>
        </ProfileInfo>
      </Header>
      <ActionButtonContainer>
        {isMyProfile ? (
          <Button
            data-qa-anchor="user-info-edit-profile-button"
            onClick={() => user?.userId && onEditUser?.(user.userId)}
            fullWidth
          >
            <PencilIcon /> <FormattedMessage id="user.editProfile" />
          </Button>
        ) : (
          <>
            {isPrivateNetwork && isFollowPending && (
              <Button onClick={() => onFollowDecline?.()} fullWidth>
                <PendingIconContainer>
                  <PendingIcon />
                </PendingIconContainer>
                <FormattedMessage id="user.cancel_follow" />
              </Button>
            )}
            {isFollowNone && (
              <PrimaryButton onClick={() => onFollowRequest?.()} fullWidth>
                <PlusIcon /> <FormattedMessage id="user.follow" />
              </PrimaryButton>
            )}
          </>
        )}
        <OptionMenu options={allOptions} pullRight={true} />
      </ActionButtonContainer>
      {isMyProfile && pendingUsers.length > 0 && isPrivateNetwork && (
        <PendingNotification
          onClick={() => {
            onPendingNotificationClick?.();
            // setActiveTab(UserFeedTabs.FOLLOWERS);
            // setTimeout(() => setFollowActiveTab(PENDING_TAB), 250);
          }}
        >
          <NotificationTitle>
            <TitleEllipse />
            <FormattedMessage id="follow.pendingNotification.title" />
          </NotificationTitle>
          <NotificationBody>
            <FormattedMessage id="follow.pendingNotification.body" />
          </NotificationBody>
        </PendingNotification>
      )}
    </Container>
  );
};

export default (props: UIUserInfoProps) => {
  const CustomComponentFn = useCustomComponent<UIUserInfoProps>('UIUserInfo');

  if (CustomComponentFn) return CustomComponentFn(props);

  return <UIUserInfo {...props} />;
};
