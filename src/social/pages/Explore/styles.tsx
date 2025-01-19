import styled from 'styled-components';

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
