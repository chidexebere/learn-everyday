import { initialState, QuizState } from '../state';

import {
  GET_QUESTIONS_FAILURE,
  GET_QUESTIONS_SET,
  GET_QUESTIONS_SUCCESS,
  LOADING_QUESTIONS,
  LOADING_QUESTIONS_DONE,
  QUIZ_GAME_OVER,
  QUIZ_GAME_PLAYING,
  RESET_FOR_NEXT_QUESTION,
  SAVE_REMAINDER_QUESTIONS_SET,
  SET_DANGER_PROGRESS,
  SET_WARNING_PROGRESS,
  UPDATE_COUNT,
  UPDATE_SCORE,
  UPDATE_USERANSWERS,
} from '../constants';
import { QuizActions } from '../actions';

const quizReducer = (state = initialState, action: QuizActions): QuizState => {
  switch (action.type) {
    case LOADING_QUESTIONS:
      return {
        ...state,
        isLoading: true,
      };
    case GET_QUESTIONS_FAILURE:
      return {
        ...state,
        isError: true,
      };
    case GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        newData: action.payload,
      };
    case LOADING_QUESTIONS_DONE:
      return {
        ...state,
        isLoading: false,
      };
    case QUIZ_GAME_OVER:
      return {
        ...state,
        gameOver: true,
      };
    case QUIZ_GAME_PLAYING:
      return {
        ...state,
        gameOver: false,
      };
    case GET_QUESTIONS_SET:
      return {
        ...state,
        newData: action.payload,
        number: 0,
        count: 0,
        score: 0,
        userAnswers: [],
        progressBarColor: 'is-success',
      };
    case SAVE_REMAINDER_QUESTIONS_SET:
      return {
        ...state,
        initialData: action.payload,
      };
    case SET_WARNING_PROGRESS:
      return {
        ...state,
        progressBarColor: 'is-warning',
      };
    case SET_DANGER_PROGRESS:
      return {
        ...state,
        progressBarColor: 'is-danger',
      };
    case UPDATE_COUNT:
      return {
        ...state,
        count: action.payload,
      };
    case UPDATE_SCORE:
      return {
        ...state,
        score: state.score + 1,
      };
    case UPDATE_USERANSWERS:
      return {
        ...state,
        userAnswers: state.userAnswers.concat(action.payload),
      };

    case RESET_FOR_NEXT_QUESTION:
      return {
        ...state,
        number: action.payload,
        count: 0,
        progressBarColor: 'is-success',
      };

    default:
      return state;
  }
};

export default quizReducer;
