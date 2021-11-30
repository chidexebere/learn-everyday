import React, { FC, MouseEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchQuizQuestions } from '../api/fetchData';
import QuizBox from '../components/QuizBox';
import Header from '../layout/Header';
import ProgressBar from '../elements/ProgressBar';
import Box from '../elements/Box';
import { filterAnswer, getSelectedOption } from '../utils/helpers';
import { AnswerObject, QuestionsObject } from '../utils/types';
import Button from '../elements/Button';
import Icon from '../elements/Icon';
import Modal from '../components/Modal';

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
  const startTrivia = async () => {
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
  const startTimer = () => {
    const interval: number = window.setInterval(() => {
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
    return interval;
  };

  const nextQuestion = () => {
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
  };

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

  const checkAnswerWithNoSelection = () => {
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
  };

  const scoreBoard = `Score : ${score}`;
  const questionBoard = `${number + 1} / ${totalQuestions}`;
  const infoBox = `${type} | ${year} | ${subject}`;
  const scoreSummary = `You got ${score} out of ${totalQuestions}`;

  useEffect(() => {
    let interval: number = 0;
    let timerId: number = 0;
    if (!gameOver) {
      interval = startTimer();
      timerId = nextQuestion();
    } else {
      clearInterval(interval);
      clearTimeout(timerId);
    }
    return () => {
      clearInterval(interval);
      clearTimeout(timerId);
    };
  }, [gameOver, count]);

  return (
    <>
      {gameOver && userAnswers.length === 0 && (
        <div className="section">
          <Button
            variant="buttonTitle"
            text="Start"
            handleClick={startTrivia}
          />
          <Link to="/list">
            <Button
              variant="buttonTitle is-inverted is-outlined"
              text="Back to Subjects"
            />
          </Link>
        </div>
      )}

      {gameOver && totalQuestions === number + 1 && (
        <div className="section">
          <Box variant="scoreSummary" text={scoreSummary} />
          <Button
            variant="buttonTitle"
            text="Play Again"
            handleClick={startTrivia}
          />
          <Link to="/">
            <Button
              variant="buttonTitle is-inverted is-outlined"
              text="Go to New Quiz"
            />
          </Link>
        </div>
      )}

      {loading && (
        <div className="section">
          <p className="title">Loading {totalQuestions} questions...</p>
        </div>
      )}

      {isError && (
        <div className="section">
          <p className="title">
            Something went wrong, Please check your internet connection
          </p>
        </div>
      )}

      {!loading && !gameOver && !isError && (
        <>
          <Header>
            <ProgressBar
              variant={progressBarColor}
              progressCount={count.toString()}
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
