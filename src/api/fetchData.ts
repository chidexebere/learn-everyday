export type QuestionsState = {
  subject: string;
  status: number;
  data: {
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
};

export const fetchQuizQuestions = async (
  totalQuestions: number,
  subject: string,
  year: number,
  type: string,
) => {
  try {
    const endpoint = `https://questions.aloc.ng/api/q/${totalQuestions}?subject=${subject}&year=${year}&type=${type}`;
    const data = await (await fetch(endpoint)).json();
    return data;
  } catch (error) {
    alert(error); // catches both errors
  }
};

export const fetchSubjectsPerYear = async (year: number) => {
  try {
    const endpoint = `https://questions.aloc.ng/api/metrics/subjects-available-for/${year}`;
    const data = await (await fetch(endpoint)).json();
    return data;
  } catch (error) {
    alert(error); // catches both errors
  }
};