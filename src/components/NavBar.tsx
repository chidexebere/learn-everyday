import React from 'react';

type Props = {
  /** type of nav bar*/
  type?: string;
  /** text content of the nav bar */
  text: string | number;
  /** callback function passed to the onClick handler*/
  handleClick?: () => void;
  /** standard children prop: accepts any valid React Node */
  children?: React.ReactNode;
};

const NavBar: React.FC<Props> = ({ type, handleClick, text, children }) => {
  const computedClass = `navbar ${type}`;

  return (
    <nav className={computedClass} onClick={handleClick}>
      {text}
      {children}
    </nav>
  );
};

export default NavBar;
