import React, { memo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import UserProfileForm from '~/social/components/UserProfileForm';

import useUser from '~/core/hooks/useUser';

import { useNavigation } from '~/social/providers/NavigationProvider';

import { Tabs, tabs } from './constants';
import { ProfileSettingsTabs, Container, ActiveTabContent, ActiveTabContainer } from './styles';
import { UserRepository } from '@amityco/ts-sdk';
import { useCustomComponent } from '~/core/providers/CustomComponentsProvider';
import useImage from '~/core/hooks/useImage';
import { useNotifications } from '~/core/providers/NotificationProvider';
import PageHeader from '~/core/components/PageHeader';

interface ProfileSettingsProps {
  userId?: string;
}

const ProfileSettings = ({ userId }: ProfileSettingsProps) => {
  const { onClickUser, onBack } = useNavigation();

  const [activeTab, setActiveTab] = useState(Tabs.EDIT_PROFILE);

  const user = useUser(userId);
  const avatarFileUrl = useImage({ fileId: user?.avatarFileId, imageSize: 'small' });
  const notification = useNotifications();

  const handleError = (error: Error) => {
    notification.error({
      content: error.message,
    });
  };

  const handleSubmit = async (
    data: Partial<Pick<Amity.User, 'displayName'>> &
      Pick<Amity.User, 'description' | 'avatarFileId'>,
  ) => {
    try {
      if (userId == null) return;
      await UserRepository.updateUser(userId, data);
      onClickUser(userId);
    } catch (err) {
      handleError(err as Error);
      console.log(err);
    }
  };

  if (user == null) {
    return null;
  }

  return (
    <Container>
      <PageHeader
        title={<FormattedMessage id="profile.setting" />}
        avatarFileUrl={avatarFileUrl}
        avatarImage={avatarFileUrl}
        backLinkText={
          <FormattedMessage
            id="ProfileSettings.returnTo"
            values={{ displayName: user?.displayName }}
          />
        }
        onBack={onBack}
      />
      <div>
        <ProfileSettingsTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>
      <ActiveTabContainer>
        {activeTab === Tabs.EDIT_PROFILE && (
          <ActiveTabContent>
            {user != null ? <UserProfileForm user={user} onSubmit={handleSubmit} /> : null}
          </ActiveTabContent>
        )}
      </ActiveTabContainer>
    </Container>
  );
};

export default memo((props: ProfileSettingsProps) => {
  const CustomComponentFn = useCustomComponent<ProfileSettingsProps>('ProfileSettings');

  if (CustomComponentFn) return CustomComponentFn(props);

  return <ProfileSettings {...props} />;
});
