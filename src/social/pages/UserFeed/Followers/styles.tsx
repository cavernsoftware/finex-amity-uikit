import styled from 'styled-components';

import UITabs from '~/core/components/Tabs';
import EmptyState from '~/core/components/EmptyState';

export const StyledTabs = styled(UITabs)`
  background: ${({ theme }) => theme.palette.system.background};
  border: 1px solid #edeef2;
  margin-bottom: 12px;
  border-radius: 8px;

  @media (max-width: 48em) {
    border-radius: 0;
    border-right: none;
    border-left: none;
  }
`;

export const UserHeaderContainer = styled.div`
  width: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px;

  > * {
    width: 100%;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  padding: 15px;

  border-top: 1px solid ${({ theme }) => theme.palette.base.shade4};

  > *:first-child {
    margin-right: 10px;
  }
`;

export const Grid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  & > * {
    // margin-bottom: 0.5rem;
    // margin-right: 0.5rem;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
`;

export const ListEmptyState = styled(EmptyState)`
  width: 100%;

  border-radius: 8px;
  border: 1px solid #edeef2;

  @media (max-width: 48em) {
    border-radius: 0;
    border-right: none;
    border-left: none;
  }
`;
