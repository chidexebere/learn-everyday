import React from 'react';

type Props = {
  /** type of modal */
  type?: string;
  /** text content of the modal */
  text?: string | number;
  /** standard children prop: accepts any valid React Node */
  children: React.ReactNode;
  isOpen: boolean;
};

const Modal: React.FC<Props> = ({ type, text, children, isOpen }) => {
  const activeClass = isOpen ? 'is-active' : '';
  const computedClass = type ? `modal ${type}` : `modal`;
  const modalClass = `${computedClass} ${activeClass}`;

  return (
    <div className={modalClass}>
      {text}
      {children}
    </div>
  );
};

export default Modal;
