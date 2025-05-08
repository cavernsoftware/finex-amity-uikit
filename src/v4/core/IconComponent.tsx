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
  // FINEX: Always use default icon since it looks ugly while initalizing
  // if (defaultIconName === configIconName) {
  //   return defaultIcon();
  // }
  // return imgIcon();
  return defaultIcon();
};
