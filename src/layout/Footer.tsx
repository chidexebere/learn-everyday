import React, { FC, ComponentProps } from 'react';

interface FooterProps extends ComponentProps<'footer'> {
  /** type of footer */
  variant?: string;
  /** standard children prop: accepts any valid React Node */
  children?: React.ReactNode;
}

const Footer: FC<FooterProps> = ({ variant, children }) => {
  const computedClass = variant ? `footer ${variant}` : `footer `;

  return <footer className={computedClass}>{children}</footer>;
};

export default Footer;
