import styled from 'styled-components';
import EmptyState from '~/core/components/EmptyState';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

export const ListEmptyState = styled(EmptyState)`
  margin-right: auto;
  margin-left: auto;
  border-radius: 8px;
  border: 1px solid #edeef2;

  @media (max-width: 48em) {
    border-radius: 0;
    border-right: none;
    border-left: none;
  }
`;
