// FINEX: Create new updateParentPostOfComment function

import { PostRepository } from '@amityco/ts-sdk';

// FINEX: Adds or updates commentsUpdatedAt in post metadata as a workaround
// to trigger a live update at the post level.
export async function updateParentPostOfComment(parentPost?: Amity.Post) {
  if (parentPost) {
    await PostRepository.editPost(parentPost.postId, {
      metadata: {
        ...parentPost.metadata,
        commentsUpdatedAt: new Date().toISOString(),
      },
    });
  }
}