import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchQuizQuestions } from '../api/fetchData';
import QuizBox from '../components/QuizBox';
import Header from '../layout/Header';
import ProgressBar from '../elements/ProgressBar';
import Box from '../elements/Box';
import { filterAnswer, getSelectedOption } from '../utils/helpers';
import Button from '../elements/Button';
import Icon from '../elements/Icon';

export type AnswerObject = {
  question: string;
  isCorrect?: boolean;
  correctAnswer: string;
  selectedAnswer?: string;
};

type Props = {
  selectedYear: number;
  questionType: string;
  selectedSubject: string;
};

const Quiz: React.FC<Props> = ({
  selectedYear,
  questionType,
  selectedSubject,
}) => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [count, setCount] = useState(0);
  const [progressBarColor, setProgressBarColor] = useState('is-success');

  const totalQuestions = 5;
  const subject = selectedSubject;
  const year = selectedYear;
  const type = questionType;

  const { data }: any = questions;
  const nextQ = number + 1;
  let answerObject: any;

  // Starts the quiz
  const startTrivia = async () => {
    setLoading(true);
    setCount(0);
    setProgressBarColor('is-success');
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      totalQuestions,
      subject,
      year,
      type,
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  // For Time for each question
  const startTimer = () => {
    const interval = setInterval(() => {
      if (count < 100) {
        if (count > 60) {
          setProgressBarColor('is-warning');
        }
        if (count > 80) {
          setProgressBarColor('is-danger');
        }
        const updatedCount = count + 2;
        setCount(updatedCount);
      }
    }, 1000);
    return interval;
  };

  const nextQuestion: any = () => {
    const nextQuesTimeout = setTimeout(() => {
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

  const checkAnswerAfterSelection = (e: any) => {
    if (!gameOver) {
      // User's answer
      const selected = e.currentTarget.value;
      const answer = data[number].answer;

      // Check answer against correct answer
      const options = data[number].option;
      const isCorrect = answer === getSelectedOption(options, selected);

      // Add score if answer is isCorrect
      if (isCorrect) setScore((prev) => prev + 1);

      // Save the answer in the array for user answers
      const selectedObject = {
        question: data[number].question,
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
      const answer = data[number].answer;
      const options = data[number].option;
      const unselectedObject = {
        question: data[number].question,
        correctAnswer: filterAnswer(options, answer),
      };
      answerObject = unselectedObject;
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const scoreBoard = `Score : ${score}`;
  const questionBoard = `${number + 1} / ${totalQuestions}`;
  const infoBoard = `${type} | ${year} | ${subject}`;
  const scoreSummary = `You got ${score} out of ${totalQuestions}`;

  useEffect(() => {
    let interval: any;
    let timerId: any;
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
  });

  return (
    <>
      {gameOver && userAnswers.length === 0 ? (
        <div className="section">
          <Button type="buttonTitle" text="Start" handleClick={startTrivia} />
          <Link to="/list">
            <Button type="buttonTitle is-inverted is-outlined" text="Go Back" />
          </Link>
        </div>
      ) : null}

      {gameOver && totalQuestions === number + 1 ? (
        <div className="section">
          <Box type="scoreSummary" text={scoreSummary} />
          <Button
            type="buttonTitle"
            text="Play Again"
            handleClick={startTrivia}
          />
          <Link to="/">
            <Button
              type="buttonTitle is-inverted is-outlined"
              text="Go to New Quiz"
            />
          </Link>
        </div>
      ) : null}

      {loading ? (
        <div className="section">
          <p className="title">Loading Questions...</p>
        </div>
      ) : null}

      {!loading && !gameOver && (
        <>
          <Header>
            <ProgressBar
              type={progressBarColor}
              progressCount={count.toString()}
            />
            <div className="header__buttom">
              <div className="header__info">
                <Box type="scoreBoard" text={questionBoard} />
                <p className="subtitle is-3">{scoreBoard}</p>
              </div>
              <Link to="/list">
                <Icon type="iconButton" fontType="fa fa-stop-circle" />
              </Link>
            </div>
          </Header>

          <QuizBox
            questionAnswered={number + 1}
            section={data[number].section}
            question={data[number].question}
            options={Object.values(data[number].option)}
            userAnswer={userAnswers[number]}
            checkAnswer={checkAnswerAfterSelection}
            info={infoBoard}
          />
        </>
      )}
    </>
  );
};

export default Quiz;