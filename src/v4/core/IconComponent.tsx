export interface IconComponentProps {
  defaultIcon: () => JSX.Element;
  imgIcon: () => JSX.Element;
  defaultIconName?: string;
  configIconName?: string;
}

export const IconComponent = ({
  defaultIcon,
  imgIcon,
  defaultIconName,
  configIconName,
}: IconComponentProps) => {
  if (defaultIconName === configIconName) {
    return defaultIcon();
  }

  // FINEX: Hide this since it looks ugly while initalizing
  // return imgIcon();
  return null;
};
