import styled from 'styled-components';
import MediaGalleryTabs from '~/core/components/Tabs/MediaGalleryTabs';

export const MediaGalleryContainer = styled.div`
  padding: 1.25em 1em;
  background: ${({ theme }) => theme.palette.system.background};
  border: 1px solid ${({ theme }) => theme.palette.system.borders};
  border-radius: 8px;

  @media (max-width: 48em) {
    border-radius: 0;
    border-right: none;
    border-left: none;
  }
`;

export const Tabs = styled(MediaGalleryTabs)`
  margin-bottom: 1em;
`;
