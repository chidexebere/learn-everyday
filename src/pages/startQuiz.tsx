import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { fetchQuizQuestions } from '../api/fetchData';

import Button from '../elements/Button';
import {
  GET_QUESTIONS_FAILURE,
  GET_QUESTIONS_SUCCESS,
  LOADING_QUESTIONS,
  LOADING_QUESTIONS_DONE,
  QUIZ_GAME_PLAYING,
  SAVE_REMAINDER_QUESTIONS_SET,
} from '../store/constants';
import { QuizContext } from '../store/contexts/quizContext';
import { QuestionsObject } from '../utils/types';

interface StartQuizProps {
  selectedYear: number;
  questionType: string;
  selectedSubject: string;
}

const StartQuiz: React.FC<StartQuizProps> = ({
  selectedYear,
  questionType,
  selectedSubject,
}) => {
  const { dispatch } = useContext(QuizContext);

  const startQuiz = async () => {
    let newQuestions: QuestionsObject;
    dispatch({ type: LOADING_QUESTIONS });
    dispatch({ type: QUIZ_GAME_PLAYING });
    try {
      newQuestions = await fetchQuizQuestions(
        selectedSubject,
        selectedYear,
        questionType,
      );
      const initialData = newQuestions.data;
      const newData = initialData.splice(0, 5);
      dispatch({ type: GET_QUESTIONS_SUCCESS, payload: newData });
      dispatch({ type: SAVE_REMAINDER_QUESTIONS_SET, payload: initialData });
    } catch (error) {
      dispatch({ type: GET_QUESTIONS_FAILURE });
    }
    dispatch({ type: LOADING_QUESTIONS_DONE });
  };

  return (
    <div className="section">
      <Button variant="buttonTitle" text="Start" handleClick={startQuiz} />
      <Link to="/list">
        <Button
          variant="buttonTitle is-inverted is-outlined"
          text="Back to Subjects"
        />
      </Link>
    </div>
  );
};

export default StartQuiz;
