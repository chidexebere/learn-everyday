import { AnswerObject, DataObject } from '../utils/types';

export interface LoadingQuestions {
  type: `LOADING_QUESTIONS`;
}

export interface LoadingQuestionsDone {
  type: `LOADING_QUESTIONS_DONE`;
}

export interface GetQuestions {
  type: `GET_QUESTIONS_SUCCESS`;
  payload: DataObject[];
}

export interface GetQuestionsError {
  type: `GET_QUESTIONS_FAILURE`;
}

export interface QuizGameOver {
  type: `QUIZ_GAME_OVER`;
}

export interface QuizGamePlaying {
  type: `QUIZ_GAME_PLAYING`;
}

export interface GetQuestionSet {
  type: `GET_QUESTIONS_SET`;
  payload: DataObject[];
}

export interface SaveRemainderQuestionSet {
  type: `SAVE_REMAINDER_QUESTIONS_SET`;
  payload: DataObject[];
}

export interface SetWarningProgress {
  type: `SET_WARNING_PROGRESS`;
}

export interface SetDangerProgress {
  type: `SET_DANGER_PROGRESS`;
}

export interface UpdateCount {
  type: `UPDATE_COUNT`;
  payload: number;
}

export interface UpdateScore {
  type: `UPDATE_SCORE`;
}

export interface UpdateUseranswers {
  type: `UPDATE_USERANSWERS`;
  payload: AnswerObject[];
}

export interface RestForNextQuestion {
  type: `RESET_FOR_NEXT_QUESTION`;
  payload: number;
}

export type QuizActions =
  | LoadingQuestions
  | LoadingQuestionsDone
  | GetQuestions
  | GetQuestionsError
  | QuizGameOver
  | QuizGamePlaying
  | GetQuestionSet
  | SetWarningProgress
  | SetDangerProgress
  | UpdateCount
  | UpdateScore
  | UpdateUseranswers
  | RestForNextQuestion
  | SaveRemainderQuestionSet;
