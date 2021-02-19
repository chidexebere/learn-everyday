import React from 'react';

interface BoxProps {
  /** type of box */
  type?: string;
  /** text content of the box */
  text: string | number;
  /** standard children prop: accepts any valid React Node */
  children?: React.ReactNode;
}

const Box: React.FC<BoxProps> = ({ type, text, children }) => {
  const computedClass = `box ${type}`;

  return (
    <div className={computedClass}>
      {text}
      {children}
    </div>
  );
};

export default Box;
