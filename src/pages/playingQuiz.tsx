import React from 'react';

import QuizBox from '../components/QuizBox';
import Box from '../elements/Box';
import Icon from '../elements/Icon';
import ProgressBar from '../elements/ProgressBar';
import Header from '../layout/Header';
import { AnswerObject, DataObject } from '../utils/types';

interface PlayingQuizProps {
  progressBarColor: string;
  questionBoard: string | number;
  scoreBoard?: string;
  toggleModal: () => void;
  count: number;
  number: number;
  newData: DataObject[];
  userAnswers: AnswerObject[];
  checkAnswerAfterSelection: (e: React.MouseEvent<Element, MouseEvent>) => void;
  infoBox: string;
}

const PlayingQuiz: React.FC<PlayingQuizProps> = ({
  progressBarColor,
  questionBoard,
  scoreBoard,
  toggleModal,
  count,
  number,
  newData,
  userAnswers,
  checkAnswerAfterSelection,
  infoBox,
}) => {
  return (
    <>
      <Header>
        <ProgressBar
          variant={progressBarColor}
          progressCount={count?.toString()}
        />
        <div className="header__buttom">
          <div className="header__info">
            <Box variant="scoreBoard" text={questionBoard} />
            <p className="subtitle is-3">{scoreBoard}</p>
          </div>
          <Icon
            variant="iconButton has-text-black"
            fontType="fa fa-stop-circle"
            handleClick={toggleModal}
          />
        </div>
      </Header>

      <QuizBox
        questionAnswered={number + 1}
        section={newData[number]?.section}
        question={newData[number]?.question}
        options={newData[number]?.option}
        userAnswer={userAnswers[number]}
        checkAnswer={checkAnswerAfterSelection}
        infoBox={infoBox}
      />
    </>
  );
};

export default PlayingQuiz;
