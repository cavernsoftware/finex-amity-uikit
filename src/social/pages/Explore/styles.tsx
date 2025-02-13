import styled from 'styled-components';
import { MobileContainer } from '../NewsFeed/styles';

export const Wrapper = styled.div`
  height: 100%;
  margin: 0 auto;
  overflow-y: auto;

  @media (max-width: 48em) {
    padding: 20px;
    padding-top: 0;
  }
`;

export const PageContainer = styled.div`
  max-width: 1450px;
  margin: 0 auto;
  // padding: 20px 0;
  overflow-x: hidden;
  overflow-y: auto;

  display: grid;
  grid-template-columns: 100%;
  grid-gap: 1.5rem;

  @media (max-width: 48em) {
    margin-top: 1em;
  }
`;

export const StyledMobileContainer = styled(MobileContainer)`
  background-color: #f7f7f8;
  padding: 0;
`;

export const WelcomeBanner = styled.div`
  background-color: #fff;
  padding: 14px 20px;
  margin-bottom: 20px;
  text-align: center;
  border: 1px solid #edeef2;
  border-radius: 8px;
  font-size: 12px;
  line-height: 1.6;
  color: #333;
  font-style: italic;

  @media (max-width: 48em) {
    border-radius: 0;
    border-right: none;
    border-left: none;
    margin: 0 -20px;
  }
`;

export const WelcomeBannerTextContainer = styled.div`
  max-width: 450px;
  margin: 0 auto;
`;
