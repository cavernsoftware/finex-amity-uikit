import React from 'react';
import styled from 'styled-components';

const Container = styled.div<{ withHeader?: boolean }>`
  display: grid;
  grid-template-areas: 'main' 'side';
  grid-template-columns: auto;

  ${({ withHeader }) =>
    withHeader &&
    `
    grid-template-areas: 'header' 'main' 'side';
    grid-template-columns: auto;
    grid-template-rows: min-content auto auto;
  `}

  width: 100%;
  // height: 100%;
  grid-gap: 20px;
  overflow: hidden;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-areas:
      ${({ withHeader }) => (withHeader ? `'header'` : ``)}
      'main'
      'side';
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    height: auto;
    overflow: unset;
  }
`;

const HeaderContainer = styled.div`
  grid-area: header;
  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    height: unset;
  }
`;

const Main = styled.div`
  grid-area: main;
  width: 100%;
  height: 100%;
  overflow: auto;

  @media (max-width: 768px) {
    height: unset;
  }
`;

const Side = styled.div`
  grid-area: side;
  width: 100%;
  height: 100%;
  // max-width: 20rem;
  overflow: auto;

  @media (max-width: 768px) {
    max-width: unset;
    height: unset;
  }

  & > :not(:first-child) {
    margin-top: 20px;
  }
`;

interface PageLayoutProps {
  header?: React.ReactNode;
  aside?: React.ReactNode;
  children: React.ReactNode;
}

const PageLayout = ({ header, aside, children }: PageLayoutProps) => (
  <Container withHeader={!!header}>
    {header && <HeaderContainer>{header}</HeaderContainer>}
    <Main>{children}</Main>
    <Side>{aside}</Side>
  </Container>
);

export default PageLayout;
