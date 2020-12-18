import React from 'react';

type Props = {
  /** type of progress bar */
  type?: string;
  progressCount?: string;
};

const ProgressBar: React.FC<Props> = ({ type, progressCount }) => {
  const computedClass = `progress ${type}`;

  return (
    <progress
      id="progressBar"
      className={computedClass}
      value={progressCount}
      max="100"
    ></progress>
  );
};

export default ProgressBar;
