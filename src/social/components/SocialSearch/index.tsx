import React, { useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import CommunityHeader from '~/social/components/community/Header';
import UserHeader from '~/social/components/UserHeader';

import useCommunitiesList from '~/social/hooks/useCommunitiesList';
import { useNavigation } from '~/social/providers/NavigationProvider';
import { SocialSearchContainer, SearchIcon, SearchIconContainer } from './styles';
import { useUserQueryByDisplayName } from '~/core/hooks/useUserQuery';
import { isNonNullable } from '~/helpers/utils';
import Tabs from '~/core/components/Tabs';
import styled, { css } from 'styled-components';
import Menu from '~/core/components/Menu';
import { useInputAutocomplete } from '~/core/components/InputAutocomplete';
import InputText from '~/core/components/InputText';
import Suggestions from '~/core/components/Suggestions';
import Button from '~/core/components/Button';
import { useCustomComponent } from '~/core/providers/CustomComponentsProvider';
import useCommunitiesCollection from '~/social/hooks/collections/useCommunitiesCollection';

export const Container = styled.div<{ $isOpen?: boolean }>`
  position: relative;
  overflow: visible;
  width: 100%;
  transition: width 0.1s ease-in-out;

  ${({ $isOpen }) =>
    $isOpen &&
    css`
      width: 50vw;

      @media (max-width: 48em) {
        width: calc(100vw - 2rem);
      }
    `}
`;

const SocialSearchInputText = styled(InputText)`
  // background: var(--mantine-color-white);
`;

const SocialSearchTabs = styled(Tabs)`
  box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.2);
  border-radius: 6px 6px 0 0;
  border: none;
`;

const SuggestionsMenu = styled(Menu)`
  z-index: 10;
  position: absolute;
  top: 100%;
  width: 100%;
  color: ${({ theme }) => theme.palette.base.main};
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.2);
  border-radius: 0 0 6px 6px;
  border: none;
  overflow: hidden;
`;

const CommunitySocialSearchTab = ({
  searchValue,
  isOpen,
}: {
  searchValue: string;
  isOpen?: boolean;
}) => {
  const { onClickCommunity } = useNavigation();
  const { communities, hasMore, loadMore } = useCommunitiesCollection({
    displayName: searchValue,
  });

  const filteredCommunities = communities.filter(isNonNullable);

  const filteredCommunityItems = filteredCommunities.map((community) => community.displayName);

  if (!isOpen) return null;

  return (
    <SuggestionsMenu>
      <Suggestions
        items={filteredCommunityItems}
        append={
          hasMore && loadMore ? (
            <Button fullWidth onClick={loadMore}>
              <FormattedMessage id="loadMore" />
            </Button>
          ) : null
        }
        onPick={(index) =>
          filteredCommunities[index]
            ? onClickCommunity(filteredCommunities[index].communityId)
            : null
        }
        renderItem={(displayName) => {
          const community = communities.find((community) => community.displayName === displayName);

          return community && <CommunityHeader communityId={community.communityId} />;
        }}
      />
    </SuggestionsMenu>
  );
};

const AccountSocialSearchTab = ({
  searchValue,
  isOpen,
}: {
  searchValue: string;
  isOpen?: boolean;
}) => {
  const { onClickUser } = useNavigation();
  const { users, hasMore, loadMore } = useUserQueryByDisplayName(searchValue);

  const filteredUsers = users.filter(isNonNullable);

  const filteredUserItems = filteredUsers.map((user) => user.displayName);

  if (!isOpen) return null;

  return (
    <SuggestionsMenu>
      <Suggestions
        items={filteredUserItems}
        append={
          hasMore && loadMore ? (
            <Button fullWidth onClick={loadMore}>
              <FormattedMessage id="loadMore" />
            </Button>
          ) : null
        }
        onPick={(index) => (filteredUsers[index] ? onClickUser(filteredUsers[index].userId) : null)}
        renderItem={(displayName) => {
          const user = users.find((user) => user.displayName === displayName);

          return user && <UserHeader userId={user.userId} isBanned={user?.isGlobalBanned} />;
        }}
      />
    </SuggestionsMenu>
  );
};

interface SocialSearchProps {
  className?: string;
  sticky?: boolean;
  searchBy: 'communities' | 'accounts';
}

const SocialSearch = ({ className, sticky = false, searchBy }: SocialSearchProps) => {
  const [searchValue, setSearchValue] = useState('');
  const [activeTab, setActiveTab] = useState<string>(searchBy);
  const { open, close, isOpen, containerRef } = useInputAutocomplete({
    value: searchValue,
  });

  function onClear() {
    setSearchValue('');
  }

  return (
    <SocialSearchContainer className={className} sticky={sticky}>
      <FormattedMessage id="exploreHeader.searchCommunityPlaceholder">
        {([placeholder]) => (
          <Container ref={containerRef} $isOpen={isOpen}>
            <SocialSearchInputText
              data-qa-anchor="social-search-input"
              value={searchValue}
              prepend={
                <SearchIconContainer>
                  <SearchIcon />
                </SearchIconContainer>
              }
              placeholder={typeof placeholder === 'string' ? placeholder : undefined}
              onClear={onClear}
              onChange={(newValue) => setSearchValue?.(newValue.plainText)}
              onClick={() => open()}
            />
            {isOpen ? (
              <SocialSearchTabs
                tabs={[
                  {
                    value: 'communities',
                    label: <FormattedMessage id="exploreHeader.searchTabCommunities" />,
                  },
                  {
                    value: 'accounts',
                    label: <FormattedMessage id="exploreHeader.searchTabAccounts" />,
                  },
                ]}
                activeTab={activeTab}
                onChange={(newTab) => setActiveTab(newTab)}
              />
            ) : null}
            {activeTab === 'communities' ? (
              <CommunitySocialSearchTab searchValue={searchValue} isOpen={isOpen} />
            ) : null}
            {activeTab === 'accounts' ? (
              <AccountSocialSearchTab searchValue={searchValue} isOpen={isOpen} />
            ) : null}
          </Container>
        )}
      </FormattedMessage>
    </SocialSearchContainer>
  );
};

export default (props: SocialSearchProps) => {
  const CustomComponentFn = useCustomComponent<SocialSearchProps>('SocialSearch');

  if (CustomComponentFn) return CustomComponentFn(props);

  return <SocialSearch {...props} />;
};
