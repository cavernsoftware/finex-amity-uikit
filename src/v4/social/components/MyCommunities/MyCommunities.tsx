import React from 'react';
import { CommunitySearchResult } from '~/v4/social/components/CommunitySearchResult/';
import useCommunitiesCollection from '~/v4/social/hooks/collections/useCommunitiesCollection';
import { Divider } from '~/v4/social/elements/Divider';
import { useAmityComponent } from '~/v4/core/hooks/uikit';

import styles from './MyCommunities.module.css';

interface MyCommunitiesProps {
  pageId?: string;
}

export const MyCommunities = ({ pageId = '*' }: MyCommunitiesProps) => {
  const componentId = 'my_communities';
  const { themeStyles } = useAmityComponent({
    pageId,
    componentId,
  });

  const { communities, hasMore, loadMore, isLoading } = useCommunitiesCollection({
    queryParams: { limit: 20, membership: 'member' },
  });

  return (
    <div style={themeStyles} className={styles.myCommunitiesList}>
      {/* // FINEX: Add divider only in mobile */}
      <Divider isShownOnlyInMobile />
      {/* // FINEX: Add separate container with padding */}
      <div style={themeStyles} className={styles.myCommunitiesListContainer}>
        <CommunitySearchResult
          pageId={pageId}
          communityCollection={communities}
          isLoading={isLoading}
          onLoadMore={() => {
            if (hasMore && isLoading === false) {
              loadMore();
            }
          }}
        />
      </div>
    </div>
  );
};
