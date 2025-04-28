import React from 'react';
import { CreatePostButton } from '~/v4/social/elements/CreatePostButton';
import { CreatePollButton } from '~/v4/social/elements/CreatePollButton';
import { useStoryPermission } from '~/v4/social/hooks/useStoryPermission';
import { CreateStoryButton } from '~/v4/social/elements/CreateStoryButton';
import { usePageBehavior } from '~/v4/core/providers/PageBehaviorProvider';
import { useDrawer } from '~/v4/core/providers/DrawerProvider';
import styles from './CreatePostMenu.module.css';

type CreatePostMenuProps = {
  pageId: string;
};

export function CreatePostMenu({ pageId }: CreatePostMenuProps) {
  const componentId = 'create_post_menu';

  const { hasStoryPermission } = useStoryPermission();
  const { AmityCreatePostMenuComponentBehavior } = usePageBehavior();
  const { removeDrawerData } = useDrawer();

  return (
    <div className={styles.createPostMenu}>
      <CreatePostButton
        pageId={pageId}
        componentId={componentId}
        onClick={() => {
          AmityCreatePostMenuComponentBehavior?.goToSelectPostTargetPage?.();
          removeDrawerData();
        }}
      />
      {hasStoryPermission && (
        <CreateStoryButton
          pageId={pageId}
          componentId={componentId}
          onClick={() => {
            AmityCreatePostMenuComponentBehavior?.goToStoryTargetSelectionPage?.();
            removeDrawerData();
          }}
        />
      )}
      <CreatePollButton
        pageId={pageId}
        componentId={componentId}
        onClick={() => {
          AmityCreatePostMenuComponentBehavior?.goToSelectPollPostTargetPage?.();
          removeDrawerData();
        }}
      />
    </div>
  );
}
