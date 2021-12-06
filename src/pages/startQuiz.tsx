import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../elements/Button';

interface StartQuizProps {
  startQuiz: () => void;
}

const StartQuiz: React.FC<StartQuizProps> = ({ startQuiz }) => {
  return (
    <div className="section">
      <Button variant="buttonTitle" text="Start" handleClick={startQuiz} />
      <Link to="/list">
        <Button
          variant="buttonTitle is-inverted is-outlined"
          text="Back to Subjects"
        />
      </Link>
    </div>
  );
};

export default StartQuiz;
