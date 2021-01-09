import React from 'react';

type Props = {
  /** type of icon*/
  type?: string;
  /** font type of the icon */
  fontType?: string;
  /** callback function passed to the onClick handler*/
  handleClick?: () => void;
};

const Icon: React.FC<Props> = ({ type, fontType, handleClick }) => {
  const computedClass = `icon ${type}`;
  const fontClass = `${fontType}`;

  return (
    <span className={computedClass} onClick={handleClick}>
      <i className={fontClass}></i>
    </span>
  );
};

export default Icon;
