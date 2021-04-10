import React, { FC, ComponentProps } from 'react';

interface ProgressBarProps extends ComponentProps<'progress'> {
  /** type of progress bar */
  variant?: string;
  progressCount?: string;
}

const ProgressBar: FC<ProgressBarProps> = ({ variant, progressCount }) => {
  const computedClass = `progress ${variant}`;

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
