// FINEX: Create new useSortedCommunities hook that puts the official community
// at the top of the communities list, whether the user is joined or not.

import { useMemo } from 'react';
import { useConfig } from '~/v4/social/providers/ConfigProvider';
import useCommunity from '~/v4/core/hooks/collections/useCommunity';

export const useSortedCommunities = ({ communities }: { communities: Amity.Community[] }) => {
  const config = useConfig();
  const { community: officialCommunity } = useCommunity({ communityId: config.officialAmityCommunityId });
  return useMemo(() => {
    return officialCommunity
      ? [
        officialCommunity, 
        ...communities.filter((community) => community.communityId !== officialCommunity.communityId),
      ]
      : communities;
  }, [communities, officialCommunity]);
};
