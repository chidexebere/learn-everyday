import React, { useState, useEffect } from 'react';

type Props = {
  /** type of progress bar */
  type?: string;
};

const ProgressBar: React.FC<Props> = ({ type }) => {
  const computedClass = `progress ${type}`;

  const [count, setCount] = useState(0);
  let interval: any = null;

  const startTimer = () => {
    interval = setInterval(() => {
      if (count < 100) {
        const updatedCount = count + 1;
        setCount(updatedCount);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <progress
      id="progressBar"
      className={computedClass}
      value={count.toString()}
      max="100"
    ></progress>
  );
};

export default ProgressBar;
