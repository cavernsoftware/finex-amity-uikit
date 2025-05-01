// FINEX: Create new ProfileMenuItem component

import React from 'react';
import UserRegular from '~/v4/icons/UserRegular';
import { useAmityElement } from '~/v4/core/hooks/uikit';
import { IconComponent } from '~/v4/core/IconComponent';
import { PageTypes, useNavigation } from '~/v4/core/providers/NavigationProvider';
import { CommunitySideBarMenuItem } from '~/v4/social/elements/CommunitySideBarMenuItem';
import useSDK from '~/v4/core/hooks/useSDK';

type ProfileMenuItemProps = {
  pageId?: string;
  componentId?: string;
};

export function ProfileMenuItem({ pageId = '*', componentId = '*' }: ProfileMenuItemProps) {
  const elementId = 'profile_sidebar_menu_item';

  const userId = useSDK().currentUserId;
  const { page, onClickUser } = useNavigation();
  const { accessibilityId, config, isExcluded, defaultConfig, uiReference } = useAmityElement({
    pageId,
    componentId,
    elementId,
  });

  if (isExcluded) return null;

  return (
    <CommunitySideBarMenuItem
      accessibilityId={accessibilityId}
      isActive={page.type === PageTypes.UserProfilePage && page.context.userId === userId}
      onPress={() => {
        userId && onClickUser(userId);
      }}
      icon={(props) => (
        <IconComponent
          configIconName={config.icon}
          defaultIconName={defaultConfig.icon}
          defaultIcon={() => <UserRegular {...props} style={{ padding: 1 }} />}
          imgIcon={() => <img src={config.icon} alt={uiReference} />}
        />
      )}
    >
      Profile
    </CommunitySideBarMenuItem>
  );
}
