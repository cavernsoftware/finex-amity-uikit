import styled from 'styled-components';
import Tabs from '~/core/components/Tabs';

export const CommunityMembersTabs = styled(Tabs)`
  border-radius: 0;
  border-right: 0;
  border-left: 0;
`;

export const CommunityMembersContainer = styled.div`
  background: ${({ theme }) => theme.palette.system.background};
  border: 1px solid #edeef2;
  flex: 2;
  border-radius: 8px;

  @media (max-width: 48em) {
    border-radius: 0;
    border-right: none;
    border-left: none;
  }
`;

export const CommunityMembersHeader = styled.div`
  ${({ theme }) => theme.typography.title};
  padding: 12px 16px;
`;

export const CommunityMemberContainer = styled.div`
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MemberInfo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
