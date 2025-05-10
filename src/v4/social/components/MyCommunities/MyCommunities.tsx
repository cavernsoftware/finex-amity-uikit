import React from 'react';
import { CommunitySearchResult } from '~/v4/social/components/CommunitySearchResult/';
import useCommunitiesCollection from '~/v4/social/hooks/collections/useCommunitiesCollection';
import { Divider } from '~/v4/social/elements/Divider';
import { useAmityComponent } from '~/v4/core/hooks/uikit';
import { useSortedCommunities } from '~/v4/social/hooks/useSortedCommunities';

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

  // FINEX: Use new useSortedCommunities hook
  const sortedCommunities = useSortedCommunities({ communities });

  return (
    <div style={themeStyles} className={styles.myCommunitiesList}>
      {/* // FINEX: Hide divider */}
      {/* <Divider isShownOnlyInMobile /> */}
      {/* // FINEX: Add separate container with padding */}
      <div style={themeStyles} className={styles.myCommunitiesList__container}>
        <CommunitySearchResult
          pageId={pageId}
          // FINEX: Use sortedCommunities
          // communityCollection={communities}
          communityCollection={sortedCommunities}
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
