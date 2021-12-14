import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Modal from '../components/Modal';
import QuizBox from '../components/QuizBox';
import Box from '../elements/Box';
import Button from '../elements/Button';
import Icon from '../elements/Icon';
import ProgressBar from '../elements/ProgressBar';
import Header from '../layout/Header';
import {
  QUIZ_GAME_OVER,
  RESET_FOR_NEXT_QUESTION,
  SET_DANGER_PROGRESS,
  SET_WARNING_PROGRESS,
  UPDATE_COUNT,
  UPDATE_SCORE,
  UPDATE_USERANSWERS,
} from '../store/constants';
import { QuizContext } from '../store/contexts/quizContext';
import { filterAnswer, getSelectedOption } from '../utils/helpers';
import { AnswerObject } from '../utils/types';

interface PlayingQuizProps {
  selectedYear: number;
  questionType: string;
  selectedSubject: string;
}

const PlayingQuiz: React.FC<PlayingQuizProps> = ({
  selectedYear,
  questionType,
  selectedSubject,
}) => {
  const { state, dispatch } = useContext(QuizContext);
  const {
    number,
    score,
    count,
    progressBarColor,
    newData,
    userAnswers,
    totalQuestions,
    initialData,
  } = state;

  const [showModal, setShowModal] = useState(false);

  // For Modal
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const nextQ = number + 1;
  const answerArray: AnswerObject[] = [];

  const scoreBoard = `Score : ${score}`;
  const questionBoard = `${number + 1} / ${totalQuestions}`;
  const infoBox = `${questionType} | ${selectedYear} | ${selectedSubject}`;

  useEffect(() => {
    let interval = 0;
    interval = window.setInterval(() => {
      if (count === 100) checkAnswerWithNoSelection();
      if (count < 100) {
        if (count > 60) {
          dispatch({ type: SET_WARNING_PROGRESS });
        }
        if (count > 80) {
          dispatch({ type: SET_DANGER_PROGRESS });
        }
        const updatedCount = count + 2;
        dispatch({ type: UPDATE_COUNT, payload: updatedCount });
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [count]);

  useEffect(() => {
    let timerId = 0;

    timerId = window.setTimeout(() => {
      if (nextQ === totalQuestions) {
        dispatch({ type: QUIZ_GAME_OVER });
      } else {
        dispatch({ type: RESET_FOR_NEXT_QUESTION, payload: nextQ });
      }
    }, 50000);

    return () => {
      clearTimeout(timerId);
    };
  }, [nextQ]);

  const nextQuestion = () => {
    const nextQuesTimeout: number = window.setTimeout(() => {
      if (nextQ === totalQuestions) {
        dispatch({ type: QUIZ_GAME_OVER });
      } else {
        dispatch({ type: RESET_FOR_NEXT_QUESTION, payload: nextQ });
      }
    }, 3000);
    return nextQuesTimeout;
  };

  const checkAnswerAfterSelection = (e: React.MouseEvent<HTMLElement>) => {
    // User's answer
    const { value } = e.target as HTMLButtonElement;
    const selected = value;
    const answer = newData[number].answer;

    // Check answer against correct answer
    const options = newData[number].option;
    const isCorrect = answer === getSelectedOption(options, selected);

    // Add score if answer is isCorrect
    if (isCorrect) dispatch({ type: UPDATE_SCORE });

    // Save the answer in the array for user answers
    const selectedObject = {
      question: newData[number].question,
      isCorrect,
      correctAnswer: filterAnswer(options, answer),
      selectedAnswer: selected,
    };
    answerArray.push(selectedObject);
    dispatch({ type: UPDATE_USERANSWERS, payload: answerArray });
    nextQuestion();
  };

  const checkAnswerWithNoSelection = () => {
    const answer = newData[number].answer;
    const options = newData[number].option;
    const unselectedObject = {
      question: newData[number].question,
      correctAnswer: filterAnswer(options, answer),
    };
    answerArray.push(unselectedObject);
    dispatch({ type: UPDATE_USERANSWERS, payload: answerArray });
  };

  console.log(initialData);
  console.log(newData);

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

      <Modal isOpen={showModal}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Do you want to end this quiz?</p>
            <Icon
              variant="iconButton has-text-black"
              fontType="fa fa-window-close"
              handleClick={toggleModal}
            />
          </header>
          <footer className="modal-card-foot">
            <Link to="/list">
              <Button variant="is-success is-outlined" text="Yes" />
            </Link>
            <Button variant="is-warning" text="No" handleClick={toggleModal} />
          </footer>
        </div>
      </Modal>
    </>
  );
};

export default PlayingQuiz;
