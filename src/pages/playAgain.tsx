import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import Box from '../elements/Box';
import Button from '../elements/Button';
import { GET_QUESTIONS_SET, QUIZ_GAME_PLAYING } from '../store/constants';
import { QuizContext } from '../store/contexts/quizContext';

const PlayAgain: React.FC = () => {
  const { state, dispatch } = useContext(QuizContext);
  const { score, initialData, totalQuestions } = state;

  const scoreSummary = `You got ${score} out of ${totalQuestions}`;

  // Starts the quiz
  const playAgain = () => {
    dispatch({ type: QUIZ_GAME_PLAYING });
    const newData = initialData.splice(0, 5);
    dispatch({ type: GET_QUESTIONS_SET, payload: newData });
  };

  return (
    <div className="section">
      <Box variant="scoreSummary" text={scoreSummary} />
      <Button variant="buttonTitle" text="Play Again" handleClick={playAgain} />
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
