export const questionYearStart = 2000;

export const questionYearEnd = 2016;

export const getQuestionYears = (
  questionYearStart: number,
  questionYearEnd: number,
): number[] => {
  const years: number[] = [];
  const startYear = questionYearStart;
  const endYear = questionYearEnd;
  years.push(startYear);
  let lastItem = startYear;
  while (lastItem < endYear) {
    years.push(lastItem + 1);
    lastItem = years[years.length - 1];
  }
  return years;
};

type Options = {
  a: string;
  b: string;
  c: string;
  d: string;
};

// This gets the actual value answer string from each question data
export const filterAnswer = (options: Options, answer: string): string => {
  const optionKeys = Object.keys(options);
  const filteredAnswerIndex = optionKeys.indexOf(answer);
  const optionValues = Object.values(options);
  return optionValues[filteredAnswerIndex];
};

// This gets the selected option key of the user
export const getSelectedOption = (
  options: Options,
  selected: string,
): string => {
  const optionValues = Object.values(options);
  const optionKeys = Object.keys(options);
  const selectedAnswerIndex = optionValues.indexOf(selected);
  return optionKeys[selectedAnswerIndex];
};
