import React, { PropsWithChildren, createContext, useContext, useMemo } from 'react';

// FINEX: Create DefaultConfig type
type DefaultConfig = {
  socialCommunityCreationButtonVisible: boolean;
  officialAmityCommunityId?: string;
};

// FINEX: Use DefaultConfig type
// const defaultConfig = {
const defaultConfig: DefaultConfig = {
  socialCommunityCreationButtonVisible: true,
  // FINEX: Add officialAmityCommunityId
  officialAmityCommunityId: undefined,
};

const ConfigContext = createContext(defaultConfig);

export const useConfig = () => useContext(ConfigContext);

type ConfigProviderProps = PropsWithChildren<{
  config: typeof defaultConfig;
}>;

export default function ConfigProvider({ children, config }: ConfigProviderProps) {
  const value = useMemo(() => ({ ...defaultConfig, ...config }), [config]);

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
}
