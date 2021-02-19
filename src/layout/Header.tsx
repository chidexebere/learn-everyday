import React from 'react';

interface HeaderProps {
  /** type of header */
  type?: string;
  /** standard children prop: accepts any valid React Node */
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ type, children }) => {
  const computedClass = type ? `header ${type}` : `header`;

  return <header className={computedClass}>{children}</header>;
};

export default Header;
