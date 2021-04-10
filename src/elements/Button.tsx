import React, { FC, ComponentProps } from 'react';

interface ButtonProps extends ComponentProps<'button'> {
  /** type of button*/
  variant?: string;
  /** text content of the button */
  text: string | number;
  /** callback function passed to the onClick handler*/
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** checks if button is enabled or disabled */
  isDisabled?: boolean;
  /** value of the button */
  value?: string | number;
  /** correct of the button */
  correct?: boolean;
  /** checks if user clicks the button */
  userClicked?: boolean;
  /** standard children prop: accepts any valid React Node */
  children?: React.ReactNode;
}

const Button: FC<ButtonProps> = ({
  variant,
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

  const computedClass = variant ? `button ${variant}` : `button`;
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
