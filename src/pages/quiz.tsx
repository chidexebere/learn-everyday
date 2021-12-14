import React, { FC, useContext } from 'react';

import Error from './error';
import Loading from './loading';
import StartQuiz from './startQuiz';
import PlayAgain from './playAgain';
import PlayingQuiz from './playingQuiz';
import { QuizContext } from '../store/contexts/quizContext';
import NoMoreQuestions from './noMoreQuestions';

interface QuizProps {
  selectedYear: number;
  questionType: string;
  selectedSubject: string;
}

const Quiz: FC<QuizProps> = ({
  selectedYear,
  questionType,
  selectedSubject,
}) => {
  const { state } = useContext(QuizContext);
  const {
    isError,
    isLoading,
    gameOver,
    number,
    userAnswers,
    totalQuestions,
    initialData,
  } = state;

  return (
    <>
      {gameOver && userAnswers.length === 0 && (
        <StartQuiz
          selectedSubject={selectedSubject}
          selectedYear={selectedYear}
          questionType={questionType}
        />
      )}

      {gameOver && totalQuestions === number + 1 && initialData.length >= 5 && (
        <PlayAgain />
      )}

      {gameOver && totalQuestions === number + 1 && initialData.length < 5 && (
        <NoMoreQuestions />
      )}

      {isLoading && (
        <Loading>
          <p className="title">Loading {totalQuestions} questions...</p>
        </Loading>
      )}

      {isError && <Error />}

      {!isLoading && !gameOver && !isError && (
        <PlayingQuiz
          selectedSubject={selectedSubject}
          selectedYear={selectedYear}
          questionType={questionType}
        />
      )}
    </>
  );
};

export default Quiz;
