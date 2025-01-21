import styled, { css } from 'styled-components';

import Avatar from '~/core/components/Avatar';

export const UserHeaderContainer = styled.div<{ $noSubtitle?: boolean }>`
  display: grid;
  grid-template-areas: 'avatar title' 'avatar subtitle';
  grid-template-columns: min-content auto;
  grid-template-rows: min-content min-content;
  grid-gap: 0 0.5em;
  padding: 1em;
  ${({ $noSubtitle: noSubtitle }) =>
    !noSubtitle &&
    css`
      grid-template-areas: 'avatar title';
      align-items: center;
    `}
`;

export const UserHeaderAvatar = styled(Avatar)`
  grid-area: avatar;
`;

export const UserNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1.3;
`;

export const UserHeaderTitle = styled.div`
  grid-area: title;
  ${({ theme }) => theme.typography.title}
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 8px;

  > div {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

export const UserHeaderSubtitle = styled.div`
  grid-area: subtitle;
  ${({ theme }) => theme.typography.body}
`;

export const DebtPayoffDaysLeft = styled.div`
  background-color: var(--mantine-color-blue-light);
  color: var(--mantine-color-blue-text);
  font-weight: 700;
  line-height: 1;
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 100px;
  cursor: pointer;
`;
