import React from 'react';

type Props = {
  /** type of footer */
  type?: string;
  /** standard children prop: accepts any valid React Node */
  children?: React.ReactNode;
};

const Footer: React.FC<Props> = ({ type, children }) => {
  const computedClass = type ? `footer ${type}` : `footer `;

  return <footer className={computedClass}>{children}</footer>;
};

export default Footer;
