import React from 'react';

type Props = {
  /** type of button*/
  type?: string;
  /** text content of the button */
  text: string | number;
  /** callback function passed to the onClick handler*/
  handleClick?: (e: any) => void;
  /** checks if button is enabled or disabled */
  isDisabled?: boolean;
  /** value of the button */
  value?: any;
  /** correct of the button */
  correct?: any;
  /** checks if user clicks the button */
  userClicked?: boolean;
  /** standard children prop: accepts any valid React Node */
  children?: React.ReactNode;
};

const Button: React.FC<Props> = ({
  type,
  handleClick,
  isDisabled,
  value,
  text,
  children,
  correct,
  userClicked,
}) => {
  const customColor = correct
    ? `is-success`
    : !correct && userClicked
    ? `is-danger`
    : `is-info`;

  const computedClass = type ? `button ${type}` : `button`;
  const buttonClass = `${computedClass} ${customColor}`;

  return (
    <button
      disabled={isDisabled}
      className={buttonClass}
      value={value}
      onClick={handleClick}
    >
      {text}
      {children}
    </button>
  );
};

export default Button;
