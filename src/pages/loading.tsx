import React from 'react';

interface LoadingProps {
  /** standard children prop: accepts any valid React Node */
  children?: React.ReactNode;
}

const Loading: React.FC<LoadingProps> = ({ children }) => {
  return <div className="section">{children}</div>;
};

export default Loading;
