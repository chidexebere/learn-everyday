import React, { FC, MouseEvent, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { fetchQuizQuestions } from '../api/fetchData';
import { filterAnswer, getSelectedOption } from '../utils/helpers';
import { AnswerObject, QuestionsObject } from '../utils/types';
import Button from '../elements/Button';
import Icon from '../elements/Icon';
import Modal from '../components/Modal';
import Error from './error';
import Loading from './loading';
import StartQuiz from './startQuiz';
import PlayAgain from './playAgain';
import PlayingQuiz from './playingQuiz';

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
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsObject>({
    subject: '',
    status: 0,
    data: [
      {
        id: 0,
        question: '',
        option: {
          a: '',
          b: '',
          c: '',
          d: '',
        },
        section: '',
        image: '',
        answer: '',
        solution: '',
        examtype: '',
        examyear: '',
      },
    ],
  });
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [count, setCount] = useState(0);
  const [progressBarColor, setProgressBarColor] = useState('is-success');
  const [isError, setIsError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const totalQuestions = 5;
  const subject = selectedSubject;
  const year = selectedYear;
  const type = questionType;

  const { data } = questions;
  const newData = data;

  // const dataSet = data;
  // console.log(`dataSet: ${dataSet}`);
  // const newData = dataSet.splice(0, totalQuestions);
  console.log(newData);

  const nextQ = number + 1;
  let answerObject: AnswerObject;

  // For Modal
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Starts the quiz
  const startQuiz = async () => {
    let newQuestions;
    setIsError(false);
    setLoading(true);
    setCount(0);
    setProgressBarColor('is-success');
    setGameOver(false);
    try {
      newQuestions = await fetchQuizQuestions(subject, year, type);
      setQuestions(newQuestions);
    } catch (error) {
      setIsError(true);
    }
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  // console.log(data.length);

  // For Time for each question
  // const startTimer = useCallback(() => {
  //   const interval: number = window.setInterval(() => {
  //     if (count < 50) {
  //       if (count > 30) {
  //         setProgressBarColor('is-warning');
  //       }
  //       if (count > 40) {
  //         setProgressBarColor('is-danger');
  //       }
  //       const updatedCount = count + 1;
  //       setCount(updatedCount);
  //     }
  //   }, 1000);
  //   return interval;
  // }, []);

  const checkAnswerAfterSelection = (e: MouseEvent) => {
    if (!gameOver) {
      // User's answer
      const { value } = e.target as HTMLButtonElement;
      const selected = value;
      const answer = newData[number].answer;

      // Check answer against correct answer
      const options = newData[number].option;
      const isCorrect = answer === getSelectedOption(options, selected);

      // Add score if answer is isCorrect
      if (isCorrect) setScore((prev) => prev + 1);

      // Save the answer in the array for user answers
      const selectedObject = {
        question: newData[number].question,
        isCorrect,
        correctAnswer: filterAnswer(options, answer),
        selectedAnswer: selected,
      };
      answerObject = selectedObject;
      setUserAnswers((prev) => [...prev, answerObject]);
      nextQuestion();
    }
  };

  const checkAnswerWithNoSelection = useCallback(() => {
    if (!gameOver) {
      const answer = newData[number].answer;
      const options = newData[number].option;
      const unselectedObject = {
        question: newData[number].question,
        correctAnswer: filterAnswer(options, answer),
      };
      answerObject = unselectedObject;
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  }, [gameOver]);

  const nextQuestion = useCallback(() => {
    const nextQuesTimeout: number = window.setTimeout(() => {
      if (nextQ === totalQuestions) {
        setGameOver(true);
      } else {
        if (count === 100) checkAnswerWithNoSelection();
        setNumber(nextQ);
        setCount(0);
        setProgressBarColor('is-success');
      }
    }, 3000);
    return nextQuesTimeout;
  }, [count, nextQ, checkAnswerWithNoSelection]);

  const scoreBoard = `Score : ${score}`;
  const questionBoard = `${number + 1} / ${totalQuestions}`;
  const infoBox = `${type} | ${year} | ${subject}`;
  const scoreSummary = `You got ${score} out of ${totalQuestions}`;

  useEffect(() => {
    let interval: number = 0;
    let timerId: number = 0;
    if (!gameOver) {
      interval = window.setInterval(() => {
        if (count < 50) {
          if (count > 30) {
            setProgressBarColor('is-warning');
          }
          if (count > 40) {
            setProgressBarColor('is-danger');
          }
          const updatedCount = count + 1;
          setCount(updatedCount);
        }
      }, 1000);

      timerId = nextQuestion();
    } else {
      clearInterval(interval);
      clearTimeout(timerId);
    }
    return () => {
      clearInterval(interval);
      clearTimeout(timerId);
    };
  }, [gameOver, count, nextQuestion]);

  return (
    <>
      {gameOver && userAnswers.length === 0 && (
        <StartQuiz startQuiz={startQuiz} />
      )}

      {gameOver && totalQuestions === number + 1 && (
        <PlayAgain scoreSummary={scoreSummary} startQuiz={startQuiz} />
      )}

      {loading && (
        <Loading>
          <p className="title">Loading {totalQuestions} questions...</p>
        </Loading>
      )}

      {isError && <Error />}

      {!loading && !gameOver && !isError && (
        <PlayingQuiz
          progressBarColor={progressBarColor}
          questionBoard={questionBoard}
          scoreBoard={scoreBoard}
          toggleModal={toggleModal}
          count={count}
          number={number}
          newData={newData}
          userAnswers={userAnswers}
          checkAnswerAfterSelection={checkAnswerAfterSelection}
          infoBox={infoBox}
        />
      )}

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

export default Quiz;
