import { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { ArrowRight, Shield } from '~/icons';

export const PostHeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const PostInfo = styled.div`
  margin-left: 8px;
`;

export const NameContainer = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  align-items: center;
  gap: 4px;

  &.clickable {
    &:hover {
      cursor: pointer;
    }
  }
`;

export const Name = styled.div`
  ${({ theme }) => theme.typography.title}
  word-break: break-all;
`;

export const DebtPayoffDaysLeft = styled.div`
  background-color: var(--mantine-color-blue-light);
  color: var(--mantine-color-blue-text);
  font-weight: 700;
  line-height: 1;
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 100px;
`;

export const DebtPayoffDaysLeftDot = styled.div`
  color: ${({ theme }) => theme.palette.base.shade1};
  ${({ theme }) => theme.typography.caption}
  margin: 0 4px;
`;

export const ArrowSeparator = styled(ArrowRight).attrs({
  height: '8px',
  width: '8px',
})`
  color: ${({ theme }) => theme.palette.base.shade1};
`;

export const ShieldIcon = styled(Shield).attrs<{ icon?: ReactNode }>({
  height: '14px',
  width: '14px',
})`
  margin-right: 4px;
`;

export const ModeratorBadge = styled.div`
  display: flex;
  align-items: center;
  margin-right: 4px;
  color: ${({ theme }) => theme.palette.base.shade1};
  ${({ theme }) => theme.typography.captionBold};
`;

export const MessageContainer = styled.div`
  color: ${({ theme }) => theme.palette.base.shade1};
  ${({ theme }) => theme.typography.caption}

  &::before {
    content: '• ';
    margin-left: 4px;
  }
`;

export const AdditionalInfo = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'showTime',
})<{ showTime?: boolean }>`
  display: flex;
  align-items: center;

  ${({ showTime }) =>
    showTime &&
    css`
      & > ${ModeratorBadge} {
        &::after {
          content: '•';
          margin-left: 4px;
        }
      }
    `};
`;

export const PostNamesContainer = styled.div`
  display: flex;
  align-items: center;

  > :not(:first-child) {
    margin-left: 0.25rem;
  }
`;
