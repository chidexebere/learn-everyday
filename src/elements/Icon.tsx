import React from 'react';

interface IconProps {
  /** type of icon*/
  type?: string;
  /** font type of the icon */
  fontType?: string;
  /** callback function passed to the onClick handler*/
  handleClick?: () => void;
}

const Icon: React.FC<IconProps> = ({ type, fontType, handleClick }) => {
  const computedClass = type ? `icon ${type}` : `icon `;
  const fontClass = `${fontType}`;

  return (
    <span className={computedClass} onClick={handleClick}>
      <i className={fontClass}></i>
    </span>
  );
};

export default Icon;
