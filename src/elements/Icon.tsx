import React from 'react';

interface IconProps {
  /** type of icon*/
  variant?: string;
  /** font type of the icon */
  fontType?: string;
  /** callback function passed to the onClick handler*/
  handleClick?: () => void;
}

const Icon: React.FC<IconProps> = ({ variant, fontType, handleClick }) => {
  const computedClass = variant ? `icon ${variant}` : `icon `;
  const fontClass = `${fontType}`;

  return (
    <span className={computedClass} onClick={handleClick}>
      <i className={fontClass}></i>
    </span>
  );
};

export default Icon;
