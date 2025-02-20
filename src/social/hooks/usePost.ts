import { PostRepository, SubscriptionLevels } from '@amityco/ts-sdk';

import useLiveObject from '~/core/hooks/useLiveObject';
import usePostSubscription from '~/social/hooks/usePostSubscription';

const usePost = (postId?: string): Amity.Post | null | undefined => {
  usePostSubscription({
    postId,
    level: SubscriptionLevels.POST,
  });

  usePostSubscription({
    postId,
    level: SubscriptionLevels.COMMENT,
  });

  const post: Amity.Post | null | undefined = useLiveObject({
    fetcher: PostRepository.getPost,
    params: postId as string,
    shouldCall: () => !!postId,
  });

  return post as Amity.Post | null | undefined;
};

export default usePost;
