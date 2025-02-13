import React from 'react';

import RecommendedList from '~/social/components/community/RecommendedList';
import TrendingList from '~/social/components/community/TrendingList';
// import CategoriesCard from '~/social/components/category/CategoriesCard';

import {
  Wrapper,
  PageContainer,
  WelcomeBanner,
  WelcomeBannerTextContainer,
  StyledMobileContainer,
} from './styles';
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
      <PageContainer>
        <WelcomeBanner>
          <WelcomeBannerTextContainer>
            Welcome to the Finex Communities! 🎉 Join a community with like&#8209;minded people on
            the same debt&#8209;free journey. Share tips, advice, stories, and resources that keep
            you motivated&nbsp;&&nbsp;inspired!&nbsp;🙌
          </WelcomeBannerTextContainer>
        </WelcomeBanner>
        <RecommendedList />
        <TrendingList />
        {/* <CategoriesCard /> */}
      </PageContainer>
    </Wrapper>
  );
};

export default ExplorePage;
