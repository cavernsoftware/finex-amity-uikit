import React from 'react';
import { PostCreationButton } from '~/v4/social/elements/PostCreationButton';
import { GlobalSearchButton } from '~/v4/social/elements/GlobalSearchButton';
import { HeaderLabel } from '~/v4/social/elements/HeaderLabel';
import styles from './TopNavigation.module.css';
import { useAmityComponent } from '~/v4/core/hooks/uikit';
import { useNavigation } from '~/v4/core/providers/NavigationProvider';
import { HomePageTab } from '~/v4/social/constants/HomePageTab';
import { AmityCommunitySetupPageMode } from '~/v4/social/pages/CommunitySetupPage/CommunitySetupPage';

export interface TopNavigationProps {
  pageId?: string;
  selectedTab?: HomePageTab;
  onClickPostCreationButton?: () => void;
  // FINEX: Add defaultText
  defaultText?: string;
}

export function TopNavigation({
  pageId = '*',
  selectedTab,
  onClickPostCreationButton,
  // FINEX: Add defaultText
  defaultText,
}: TopNavigationProps) {
  const componentId = 'top_navigation';
  const { goToSocialGlobalSearchPage, goToMyCommunitiesSearchPage, goToCreateCommunityPage } =
    useNavigation();
  const { isExcluded, themeStyles } = useAmityComponent({
    pageId,
    componentId,
  });

  const handleGlobalSearchClick = () => {
    switch (selectedTab) {
      case HomePageTab.Newsfeed:
      case HomePageTab.Explore:
        goToSocialGlobalSearchPage();
        break;
      case HomePageTab.MyCommunities:
        // FINEX: Go to global search page instead of my communities search page
        // goToMyCommunitiesSearchPage();
        goToSocialGlobalSearchPage();
        break;
    }
  };

  if (isExcluded) return null;

  return (
    <div className={styles.topNavigation} style={themeStyles}>
      <div className={styles.topNavigationLeftPane}>
        {/* // FINEX: Add defaultText */}
        <HeaderLabel pageId={pageId} componentId={componentId} defaultText={defaultText} />
      </div>
      <div className={styles.topNavigationRightPane}>
        {/* // FINEX: Add button placeholder */}
        <div className={styles.topNavigationRightPane__buttonPlaceholder}>
          <GlobalSearchButton
            pageId={pageId}
            componentId={componentId}
            onPress={handleGlobalSearchClick}
          />
        </div>
        {selectedTab !== HomePageTab.Explore && (
          // FINEX: Add button placeholder
          <div className={styles.topNavigationRightPane__buttonPlaceholder}>
            <PostCreationButton
              pageId={pageId}
              componentId={componentId}
              // FINEX: Prevent going to create community page
              // onClick={() =>
              //   selectedTab == HomePageTab.MyCommunities
              //     ? goToCreateCommunityPage?.({
              //         mode: AmityCommunitySetupPageMode.CREATE,
              //       })
              //     : onClickPostCreationButton?.()
              // }
              onClick={() => onClickPostCreationButton?.()}
            />
          </div>
        )}
      </div>
    </div>
  );
}
