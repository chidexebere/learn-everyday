import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import { fetchQuizQuestions } from '../api/fetchData';
import QuizBox from '../components/QuizBox';
import Header from '../layout/Header';
import ProgressBar from '../elements/ProgressBar';
import Box from '../elements/Box';
// import Icon from '../elements/Icon';
import { filterAnswer, getSelectedOption } from '../utils/helpers';
import Button from '../elements/Button';
import Icon from '../elements/Icon';

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
  const [progressBarColor, setProgressBarColor] = useState('is-success');

  const totalQuestions = 5;
  const subject = selectedSubject;
  const year = selectedYear;
  const type = questionType;

  // console.log(questionType);

  const { data }: any = questions;
  const nextQ = number + 1;

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

  const nextQuestion: any = () => {
    const nextQuesTimeout = setTimeout(() => {
      if (nextQ === totalQuestions) {
        setGameOver(true);
      } else {
        setNumber(nextQ);
        setCount(0);
        setProgressBarColor('is-success');
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
      const isCorrect = answer === getSelectedOption(options, selected);

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

  const scoreBoard = `Score : ${score}`;
  const questionBoard = `${number + 1} / ${totalQuestions}`;
  const infoBoard = `${type} | ${year} | ${subject}`;
  const scoreSummary = `You got ${score} out of ${totalQuestions}`;

  useEffect(() => {
    // startTrivia();
    // fetchQuizQuestions(totalQuestions, subject, year, type);
    const interval = startTimer();
    const timerId = nextQuestion();
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
            <Button
              type="buttonTitle  is-inverted is-outlined"
              text="Go Back"
            />
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
              type="buttonTitle  is-inverted is-outlined"
              text="Go to New Quiz"
            />
          </Link>
        </div>
      ) : null}

      {loading ? <p>Loading Questions...</p> : null}

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

          {/* <Box type="scoreBoard" text={infoBoard} /> */}

          <QuizBox
            questionAnswered={number + 1}
            section={data[number].section}
            question={data[number].question}
            options={Object.values(data[number].option)}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            checkAnswer={checkAnswer}
            info={infoBoard}
          />
        </>
      )}
    </>
  );
};

export default Quiz;
