import styled from 'styled-components';

export default styled.div`
  // border: 1px solid #e6e6e6;
  width: 260px;
  overflow: auto;
  flex-shrink: 0;
  ${({ theme }) => theme.typography.title}

  @media (max-width: 48em) {
    background-color: white;
    width: 85%;
  }
`;
