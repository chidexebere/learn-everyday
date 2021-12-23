export type AnswerObject = {
  question: string;
  isCorrect?: boolean | undefined;
  correctAnswer: string;
  selectedAnswer?: string | undefined;
};

export type SubjectsAndQuesObject = {
  message: string;
  status: number;
  data: SubjectsAndQues[];
};

export type SubjectsAndQues = {
  subject: string;
  questions: number;
};

export type QuestionsObject = {
  subject: string;
  status: number;
  data: DataObject[];
};

export type OptionsObject = {
  a: string;
  b: string;
  c: string;
  d: string;
};

export type DataObject = {
  id: number;
  question: string;
  option: OptionsObject;
  section: string;
  image: string;
  answer: string;
  solution: string;
  examtype: string;
  examyear: string;
};
