import React, { useEffect } from 'react';
import { Divider } from '~/v4/social/elements/Divider';
import { useAmityComponent } from '~/v4/core/hooks/uikit';
import { StoryTab } from '~/v4/social/components/StoryTab';
import { GlobalFeed } from '~/v4/social/components/GlobalFeed';
import { PullToRefresh } from '~/v4/core/components/PullToRefresh';
import { PostComposer } from '~/v4/social/components/PostComposer';
import { EmptyNewsfeed } from '~/v4/social/components/EmptyNewsFeed';
import { PostContentSkeleton } from '~/v4/social/components/PostContent/PostContentSkeleton';
import { useGlobalFeedContext } from '~/v4/social/providers/GlobalFeedProvider';
import styles from './Newsfeed.module.css';

type NewsfeedProps = {
  pageId?: string;
};

export const Newsfeed = ({ pageId = '*' }: NewsfeedProps) => {
  const componentId = 'newsfeed';

  const { themeStyles } = useAmityComponent({ pageId, componentId });
  const {
    itemWithAds,
    hasMore,
    isLoading,
    globalFeaturedPostsItems,
    isGlobalFeaturedPostsLoading,
    loadMore,
    refetch,
    removeItem,
    // FINEX: Add fetchHasBeenCalled
    fetchHasBeenCalled,
  } = useGlobalFeedContext();

  useEffect(() => {
    refetch();
  }, []);

  const onFeedReachBottom = () => {
    if (hasMore && !isLoading) loadMore();
  };

  // FINEX: Show skeleton loading screen if fetch has not been called or is loading
  if (!fetchHasBeenCalled || isLoading) {
    return (
      // FINEX: Use flex gap instead of divider
      <div className={styles.newsfeed} style={{ ...themeStyles, display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: '4rem' }}>
        {/* // FINEX: Comment out divider */}
        {/* <Divider isShownOnlyInMobile /> */}
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index}>
            <PostContentSkeleton />
          </div>
        ))}
      </div>
    );
  }

  // FINEX: Show empty newsfeed if no posts
  if (itemWithAds.length === 0) {
    return <EmptyNewsfeed pageId={pageId} />;
  }

  return (
    <PullToRefresh className={styles.newsfeed} style={themeStyles} onTouchEndCallback={refetch}>
      {/* // FINEX: Comment out Divider and StoryTab for now since stories aren't used */}
      {/* <Divider /> */}
      {/* <StoryTab type="globalFeed" pageId={pageId} /> */}
      {/* // FINEX: Comment out top Divider */}
      {/* <Divider isShownOnlyInMobile /> */}
      <PostComposer pageId={pageId} />
      <GlobalFeed
        pageId={pageId}
        items={itemWithAds}
        isLoading={isLoading}
        componentId={componentId}
        onFeedReachBottom={() => onFeedReachBottom()}
        onPostDeleted={(post) => {
          if (post && post.postId) {
            removeItem(post.postId);
          }
        }}
        globalFeaturedPosts={globalFeaturedPostsItems}
        isGlobalFeaturedPostsLoading={isGlobalFeaturedPostsLoading}
      />
    </PullToRefresh>
  );
};
