import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { Newspaper, Search, UserRegular } from '~/icons';
import { PageTypes } from '~/social/constants';
import SideMenuSection from '~/core/components/SideMenuSection';
import { useNavigation } from '~/social/providers/NavigationProvider';
import SideMenuActionItem from '~/core/components/SideMenuActionItem';
import { useSDK } from '~/core/hooks/useSDK';

export const NewsIcon = styled(Newspaper).attrs<{ icon?: ReactNode }>({ width: 20, height: 20 })``;

export const SearchIcon = styled(Search).attrs<{ icon?: ReactNode }>({ width: 20, height: 20 })``;

export const UserIcon = styled(UserRegular).attrs<{ icon?: ReactNode }>({
  width: 20,
  height: 20,
})``;

interface SideSectionCommunityProps {
  shouldHideExplore?: boolean;
  children?: ReactNode;
}

const SideSectionCommunity = ({ shouldHideExplore, children }: SideSectionCommunityProps) => {
  const { onChangePage, page, onClickUser } = useNavigation();
  const { currentUserId } = useSDK();

  return (
    <SideMenuSection heading={<FormattedMessage id="sidesectioncommunity.community" />}>
      {!shouldHideExplore && (
        <SideMenuActionItem
          data-qa-anchor="side-section-community-side-menu-action-item-explore-button"
          icon={<SearchIcon />}
          active={page.type === PageTypes.Explore}
          onClick={() => onChangePage(PageTypes.Explore)}
        >
          <FormattedMessage id="sidesectioncommunity.explore" />
        </SideMenuActionItem>
      )}

      <SideMenuActionItem
        data-qa-anchor="side-section-community-side-menu-action-item-news-feed-button"
        icon={<NewsIcon />}
        active={page.type === PageTypes.NewsFeed}
        onClick={() => onChangePage(PageTypes.NewsFeed)}
      >
        <FormattedMessage id="sidesectioncommunity.newfeed" />
      </SideMenuActionItem>

      <SideMenuActionItem
        data-qa-anchor="side-section-community-side-menu-action-item-profile-button"
        icon={<UserIcon />}
        active={page.type === PageTypes.UserFeed && page.userId === currentUserId}
        onClick={() => currentUserId && onClickUser(currentUserId)}
      >
        <FormattedMessage id="sidesectioncommunity.profile" />
      </SideMenuActionItem>
      {children}
    </SideMenuSection>
  );
};

export default SideSectionCommunity;
