// FINEX: Create new GlobalFeedPost component to allow for post live object to be used

import React, { useEffect, useState } from 'react';
import usePost from '~/v4/core/hooks/objects/usePost';
import { 
  AmityPostContentComponentStyle, 
  AmityPostCategory, 
  PostContent,
} from '~/v4/social/components/PostContent/PostContent';
import { PostContentSkeleton } from '~/v4/social/components/PostContent/PostContentSkeleton';

interface GlobalFeedPostProps {
  pageId?: string;
  inputPost: Amity.Post;
  onClick?: () => void;
  onPostDeleted?: (post: Amity.Post) => void;
  style: AmityPostContentComponentStyle;
  category: AmityPostCategory;
  hideMenu?: boolean;
  hideTarget?: boolean;
  disabledContent?: boolean;
  isGlobalFeaturePost?: boolean;
  className?: string;
  // FINEX: Add isAlwaysExpanded prop
  isAlwaysExpanded?: boolean;
}

export const GlobalFeedPost = ({
  pageId = '*',
  inputPost,
  onClick,
  onPostDeleted,
  isGlobalFeaturePost,
  category,
  style,
}: GlobalFeedPostProps) => {
  const [post, setPost] = useState(inputPost);

  const { post: liveObjectPost } = usePost(inputPost.postId);

  useEffect(() => {
    if (inputPost) setPost(inputPost);
  }, [inputPost]);

  useEffect(() => {
    if (liveObjectPost) setPost(liveObjectPost);
  }, [liveObjectPost]);

  if (!post) {
    return <PostContentSkeleton pageId={pageId} />;
  }

  return (
    <PostContent
      pageId={pageId}
      post={post}
      category={category}
      style={style}
      onClick={onClick}
      onPostDeleted={onPostDeleted}
      isGlobalFeaturePost={isGlobalFeaturePost}
    />
  );
};
