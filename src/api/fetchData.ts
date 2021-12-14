import { QuestionsObject, SubjectsAndQuesObject } from '../utils/types';

export const fetchQuizQuestions = async (
  subject: string,
  year: number,
  type: string,
): Promise<QuestionsObject> => {
  const endpoint = `https://questions.aloc.com.ng/api/v2/q/30?subject=${subject}&year=${year}&type=${type}`;
  const fetchRequest = fetch(endpoint, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      AccessToken: `${process.env.REACT_APP_API_KEY}`,
    },
  });
  const response = await fetchRequest;

  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
  throw new Error(response.statusText);
};

export const fetchSubjectsPerYear = async (
  year: number,
): Promise<SubjectsAndQuesObject> => {
  const endpoint = `https://questions.aloc.com.ng/api/metrics/subjects-available-for/${year}`;
  const data = await (await fetch(endpoint)).json();
  return data;
};
