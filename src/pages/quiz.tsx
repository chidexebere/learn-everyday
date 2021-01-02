import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import { fetchQuizQuestions } from '../api/fetchData';
import QuizBox from '../components/QuizBox';
import Header from '../layout/Header';
import ProgressBar from '../elements/ProgressBar';
import Box from '../elements/Box';
import Icon from '../elements/Icon';
import { filterAnswer } from '../utils/helpers';
import Button from '../elements/Button';

export type AnswerObject = {
  question: string;
  isCorrect: boolean;
  correctAnswer: string;
  selectedAnswer: string;
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
  // const [userAnswers, setUserAnswers] = useState([]);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [count, setCount] = useState(0);

  const totalQuestions = 5;
  const subject = selectedSubject;
  const year = selectedYear;
  const type = questionType;

  const { data }: any = questions;
  const nextQ = number + 1;

  // For Time for each question
  const startTimer = () => {
    const interval = setInterval(() => {
      if (count < 100) {
        const updatedCount = count + 2;
        setCount(updatedCount);
      }
    }, 1000);
    return interval;
  };

  // Starts the quiz
  const startTrivia = async () => {
    setLoading(true);
    setCount(0);
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

  const nextQuestion: any = () => {
    const nextQuesTimeout = setTimeout(() => {
      if (nextQ === totalQuestions) {
        setGameOver(true);
      } else {
        setNumber(nextQ);
        setCount(0);
      }
    }, 3000);
    return nextQuesTimeout;
  };

  const checkAnswer = (e: any) => {
    if (!gameOver) {
      // User's answer
      const selected = e.currentTarget.value;
      const answer = data[number].answer;

      // Check answer against correct answer
      const options = data[number].option;
      const isCorrect = selected === filterAnswer(options, answer);

      // Add score if answer is isCorrect
      if (isCorrect) setScore((prev) => prev + 1);

      // Save the answer in the array for user answers
      const answerObject = {
        question: data[number].question,
        isCorrect,
        correctAnswer: filterAnswer(options, answer),
        selectedAnswer: selected,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
      nextQuestion();
    }
  };

  const scoreBoard = `${score} / ${number + 1}`;

  useEffect(() => {
    const interval = startTimer();
    const timerId = nextQuestion();
    return () => {
      clearInterval(interval);
      clearTimeout(timerId);
    };
  });

  return (
    <div className="home">
      {gameOver && userAnswers.length === 0 ? (
        <Button type="buttonTitle" text="Start" handleClick={startTrivia} />
      ) : null}

      {gameOver && totalQuestions === number + 1 ? (
        <Button
          type="buttonTitle"
          text="Play Again"
          handleClick={startTrivia}
        />
      ) : null}

      {loading ? <p>Loading Questions...</p> : null}

      {!loading && !gameOver && (
        <>
          <Header>
            <ProgressBar type="is-success" progressCount={count.toString()} />
            <div className="header__buttom">
              <Box type="scoreBoard" text={scoreBoard} />
              <Icon type="iconButton" fontType="fa fa-pause " />
            </div>
          </Header>

          <QuizBox
            questionAnswered={number + 1}
            section={data[number].section}
            question={data[number].question}
            options={Object.values(data[number].option)}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            checkAnswer={checkAnswer}
          />
        </>
      )}
    </div>
  );
};

export default Quiz;
