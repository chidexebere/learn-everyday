export const fetchQuizQuestions = async (
  totalQuestions: number,
  subject: string,
  year: number,
  type: string,
) => {
  const endpoint = `https://questions.aloc.ng/api/q/${totalQuestions}?subject=${subject}&year=${year}&type=${type}`;
  const data = await (await fetch(endpoint)).json();
  return data;
};

export const fetchSubjectsPerYear = async (year: number) => {
  const endpoint = `https://questions.aloc.ng/api/metrics/subjects-available-for/${year}`;
  const data = await (await fetch(endpoint)).json();
  return data;
};
