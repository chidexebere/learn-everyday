import React, { FC, ComponentProps } from 'react';

interface HeaderProps extends ComponentProps<'header'> {
  /** type of header */
  variant?: string;
  /** standard children prop: accepts any valid React Node */
  children?: React.ReactNode;
}

const Header: FC<HeaderProps> = ({ variant, children }) => {
  const computedClass = variant ? `header ${variant}` : `header`;

  return <header className={computedClass}>{children}</header>;
};

export default Header;
