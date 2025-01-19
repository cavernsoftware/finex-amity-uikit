import styled from 'styled-components';
import UITabs from '~/core/components/Tabs';

export const ProfileSettingsTabs = styled(UITabs)`
  background: ${({ theme }) => theme.palette.system.background};
  border: 1px solid #edeef2;
  border-top: none;
  border-radius: 0 0 8px 8px;

  @media (max-width: 48em) {
    border-radius: 0;
    border-top: none;
    border-right: none;
    border-left: none;
  }
`;
