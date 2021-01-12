import React from 'react';

type Props = {
  /** type of header */
  type?: string;
  /** standard children prop: accepts any valid React Node */
  children?: React.ReactNode;
};

const Header: React.FC<Props> = ({ type, children }) => {
  const computedClass = type ? `header ${type}` : `header`;

  return <header className={computedClass}>{children}</header>;
};

export default Header;
