import React from 'react';
import { Link } from 'react-router-dom';

import Box from '../elements/Box';
import Button from '../elements/Button';

interface PlayAgainProps {
  startQuiz: () => void;
  scoreSummary: string;
}

const PlayAgain: React.FC<PlayAgainProps> = ({ startQuiz, scoreSummary }) => {
  return (
    <div className="section">
      <Box variant="scoreSummary" text={scoreSummary} />
      <Button variant="buttonTitle" text="Play Again" handleClick={startQuiz} />
      <Link to="/">
        <Button
          variant="buttonTitle is-inverted is-outlined"
          text="Go to New Quiz"
        />
      </Link>
    </div>
  );
};

export default PlayAgain;
