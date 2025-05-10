// FINEX: Create new useSortedCommunities hook that 
// sorts communities with the official community at the top.

import { useMemo } from 'react';
import { useConfig } from '~/v4/social/providers/ConfigProvider';

export const useSortedCommunities = ({ communities }: { communities: Amity.Community[] }) => {
  const config = useConfig();
  return useMemo(() => {
    const officialCommunity = communities.find(
      (community) => community.communityId === config.officialAmityCommunityId,
    );
    return officialCommunity
      ? [
        officialCommunity, 
        ...communities.filter((community) => community.communityId !== config.officialAmityCommunityId),
      ]
      : communities;
  }, [communities, config.officialAmityCommunityId]);
};
