import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Box from '../elements/Box';
import Button from '../elements/Button';
import { QuizContext } from '../store/contexts/quizContext';

const NoMoreQuestions: React.FC = () => {
  const { state } = useContext(QuizContext);
  const { score, totalQuestions } = state;

  const scoreSummary = `You got ${score} out of ${totalQuestions}`;
  return (
    <div className="section">
      <Box variant="scoreSummary" text={scoreSummary} />
      <p className="title">There are no more questions for this quiz</p>
      <Link to="/">
        <Button
          variant="buttonTitle is-inverted is-outlined"
          text="Go to New Quiz"
        />
      </Link>
    </div>
  );
};

export default NoMoreQuestions;
