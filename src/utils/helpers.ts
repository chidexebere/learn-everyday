export const questionYearStart = 2000;

export const questionYearEnd = 2016;

export const getQuestionYears = (
  questionYearStart: number,
  questionYearEnd: number,
) => {
  let years: number[] = [];
  let startYear = questionYearStart;
  let endYear = questionYearEnd;
  years.push(startYear);
  let lastItem = startYear;
  while (lastItem < endYear) {
    years.push(lastItem + 1);
    lastItem = years[years.length - 1];
  }
  return years;
};

interface Options {
  a: string;
  b: string;
  c: string;
  d: string;
}

export const filterAnswer = (options: Options, answer: string) => {
  const optionKeys = Object.keys(options);
  const filteredAnswerIndex = optionKeys.indexOf(answer);
  const optionValues = Object.values(options);
  return optionValues[filteredAnswerIndex];
};
