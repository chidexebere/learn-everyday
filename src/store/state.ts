import { AnswerObject, DataObject } from '../utils/types';

export interface QuizState {
  isError: boolean;
  isLoading: boolean;
  gameOver: boolean;
  questions: {
    subject: string;
    status: number;
    data: [
      {
        id: number;
        question: string;
        option: {
          a: string;
          b: string;
          c: string;
          d: string;
        };
        section: string;
        image: string;
        answer: string;
        solution: string;
        examtype: string;
        examyear: string;
      },
    ];
  };
  userAnswers: AnswerObject[];
  initialData: DataObject[];
  newData: DataObject[];
  number: number;
  score: number;
  count: number;
  progressBarColor: string;
  totalQuestions: number;
}

export const initialState: QuizState = {
  isError: false,
  isLoading: false,
  gameOver: true,
  questions: {
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
  },
  userAnswers: [],
  initialData: [],
  newData: [],
  number: 0,
  score: 0,
  count: 0,
  progressBarColor: 'is-success',
  totalQuestions: 5,
};
