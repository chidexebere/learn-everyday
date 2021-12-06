export type AnswerObject = {
  question: string;
  isCorrect?: boolean;
  correctAnswer: string;
  selectedAnswer?: string;
};

export type SubjectsAndQues = {
  subject: string;
  questions: number;
};

export type QuestionsObject = {
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

export type OptionsObject = {
  a: string;
  b: string;
  c: string;
  d: string;
};

export type DataObject = {
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
};
