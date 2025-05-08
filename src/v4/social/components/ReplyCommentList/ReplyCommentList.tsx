import React from 'react';
import { Typography } from '~/v4/core/components';
import { CommentSkeleton } from '~/v4/social/components/Comment/CommentSkeleton';
import ReplyCommentIcon from '~/v4/icons/ReplyComment';
import useCommentsCollection from '~/v4/social/hooks/collections/useCommentsCollection';
import ReplyComment from '~/v4/social/components/ReplyComment/ReplyComment';
import styles from './ReplyCommentList.module.css';

interface ReplyCommentProps {
  pageId?: string;
  componentId?: string;
  community?: Amity.Community;
  referenceId: string;
  referenceType: string;
  parentId: string;
  // FINEX: Add parentPost prop
  parentPost?: Amity.Post;
}

export const ReplyCommentList = ({
  pageId = '*',
  componentId = '*',
  referenceId,
  referenceType,
  community,
  parentId,
  // FINEX: Add parentPost prop
  parentPost,
}: ReplyCommentProps) => {
  const { comments, hasMore, isLoading, loadMore } = useCommentsCollection({
    referenceId,
    referenceType: referenceType as Amity.CommentReferenceType,
    parentId,
    limit: 10,
    shouldCall: true,
    // FINEX: Set includeDeleted to false to prevent deleted comments from showing up
    // includeDeleted: true,
    includeDeleted: false,
  });

  const handleClickLoadMore = () => {
    loadMore();
  };

  return (
    <div className={styles.replyCommentList}>
      {isLoading && <CommentSkeleton numberOfSkeletons={3} />}
      {comments.map((comment) => {
        return (
          // FINEX: Add key, parentPost prop
          <ReplyComment key={comment.commentId} pageId={pageId} community={community} comment={comment as Amity.Comment} parentPost={parentPost} />
        );
      })}
      {hasMore && (
        <div
          className={styles.postReplyCommentList__viewReply_button}
          onClick={handleClickLoadMore}
        >
          <ReplyCommentIcon className={styles.postReplyCommentList__viewReply_icon} />
          <Typography.CaptionBold className={styles.postReplyCommentList__viewReply_text}>
            View more replies
          </Typography.CaptionBold>
        </div>
      )}
    </div>
  );
};
