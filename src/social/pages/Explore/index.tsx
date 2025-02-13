import React from 'react';

import RecommendedList from '~/social/components/community/RecommendedList';
import TrendingList from '~/social/components/community/TrendingList';
// import CategoriesCard from '~/social/components/category/CategoriesCard';

import { Wrapper, PageContainer, WelcomeBanner, StyledMobileContainer } from './styles';
import {
  CommunitySideMenuOverlay,
  HeadTitle,
  StyledCommunitySideMenu,
  StyledBarsIcon,
} from '../NewsFeed/styles';
import { useIntl } from 'react-intl';

interface ExplorePageProps {
  isOpen: boolean;
  toggleOpen: () => void;
  hideSideMenu?: boolean;
}

const ExplorePage = ({ isOpen, toggleOpen, hideSideMenu }: ExplorePageProps) => {
  const { formatMessage } = useIntl();

  return (
    <Wrapper>
      {hideSideMenu !== true && (
        <>
          <CommunitySideMenuOverlay isOpen={isOpen} onClick={toggleOpen} />
          <StyledCommunitySideMenu isOpen={isOpen} />
          <StyledMobileContainer>
            <StyledBarsIcon onClick={toggleOpen} />
            <HeadTitle>{formatMessage({ id: 'sidebar.explore' })}</HeadTitle>
          </StyledMobileContainer>
        </>
      )}
      <WelcomeBanner>
        {/* Welcome to the debt&#8209;free communities! 🎉 Join or create a community and stay
          motivated on your debt&#8209;free journey with others! Only your countdown can be visible
          - all other debt info is kept private to you. */}
        {/* Join or create a debt-free community to share tips, resources, and stay motivated with
          like-minded people on your debt&#8209;free journey! Only your countdown is visible - all
          other debt info is kept private to you. */}
        Welcome to the Debt&#8209;Free Communities! 🎉 Join or create a community and connect with
        like-minded people on the same debt&#8209;free journey! Only your countdown is visible to
        others - all other debt info is kept private to you.
      </WelcomeBanner>
      <PageContainer>
        <RecommendedList />
        <TrendingList />
        {/* <CategoriesCard /> */}
      </PageContainer>
    </Wrapper>
  );
};

export default ExplorePage;
