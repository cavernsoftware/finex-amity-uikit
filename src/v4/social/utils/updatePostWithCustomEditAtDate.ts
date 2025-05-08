// FINEX: Create new updatePostWithCustomEditAtDate function

import { PostRepository } from '@amityco/ts-sdk';

// FINEX: Edits post with custom editedAt date in metadata since the modify the normal editedAt date
// when a comment is added or deleted. See updateParentPostOfComment function.
export async function updatePostWithCustomEditedAtDate(post: Amity.Post, data: Parameters<typeof PostRepository.editPost>[1]) {
  return PostRepository.editPost(post.postId, {
    ...data,
    metadata: {
      ...post.metadata,
      editedAt: new Date().toISOString(),
    },
  });
}