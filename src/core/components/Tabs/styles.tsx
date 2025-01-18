import styled from 'styled-components';

export const TabsContainer = styled.nav`
  background: ${({ theme }) => theme.palette.system.background};
  border-radius: 4px;
  border: 1px solid #edeef2;
`;

export const TabsList = styled.ul`
  margin: 0;
  padding: 10px 10px;
  list-style-type: none;
`;

export const TabItem = styled.li`
  display: inline-block;
`;

export const TabButton = styled.button`
  padding: 0.3em 0.75em 0.3em 0.75em;
  margin-right: 0.5em;
  background-color: #ffffff;
  border: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  outline: none;
  color: ${({ theme }) => theme.v4.colors.base.shade3};
  text-align: center;
  border-radius: 10px;
  font-size: 0.9em;

  &:hover {
    color: #818698;
  }

  &.active {
    ${({ theme }) => `
      // border-bottom: 2px solid ${theme.v4.colors.primary.default};
      color: ${theme.v4.colors.primary.default};
      background: var(--mantine-color-blue-light);
    `}
  }

  &:disabled {
    color: #abaeba;
  }

  transition: border-color 0.3s;
`;
