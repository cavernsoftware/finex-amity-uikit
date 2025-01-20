import styled from 'styled-components';

export const EmptyStateContainer = styled.div`
  color: ${({ theme }) => theme.palette.base.shade3};
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 5rem 0.5rem;
  background: ${({ theme }) => theme.palette.system.background};
  color: ${({ theme }) => theme.palette.base.shade3};
  ${({ theme }) => theme.typography.body};
  border-radius: 8px;
  border: 1px solid #edeef2;

  @media (max-width: 48em) {
    border-radius: 0;
    border-right: none;
    border-left: none;
  }
`;

export const EmptyStateTitle = styled.div`
  ${({ theme }) => theme.typography.title}
  padding: 0.5rem;
`;

export const EmptyStateDescription = styled.div`
  ${({ theme }) => theme.typography.body}
`;
