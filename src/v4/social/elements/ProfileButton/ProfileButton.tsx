// FINEX: Create new ProfileButton component

import React from 'react';
import { useAmityElement } from '~/v4/core/hooks/uikit';
import { TabButton } from '~/v4/social/internal-components/TabButton';

export interface ProfileButtonProps {
  pageId?: string;
  componentId?: string;
  isActive?: boolean;
  onClick?: () => void;
}

export function ProfileButton({
  pageId = '*',
  componentId = '*',
  onClick,
}: ProfileButtonProps) {
  const elementId = 'profile_button';
  const { accessibilityId, isExcluded } =
    useAmityElement({
      pageId,
      componentId,
      elementId,
    });

  if (isExcluded) return null;

  return (
    <TabButton
      pageId={pageId}
      componentId={componentId}
      elementId={elementId}
      onPress={() => onClick?.()}
      data-testid={accessibilityId}
    >
      Profile
    </TabButton>
  );
}
