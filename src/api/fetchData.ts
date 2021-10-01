export const fetchQuizQuestions = async (
  totalQuestions: number,
  subject: string,
  year: number,
  type: string,
) => {
  const endpoint = `https://questions.aloc.ng/api/v2/q/${totalQuestions}?subject=${subject}&year=${year}&type=${type}`;
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

export const fetchSubjectsPerYear = async (year: number) => {
  const endpoint = `https://questions.aloc.ng/api/metrics/subjects-available-for/${year}`;
  const data = await (await fetch(endpoint)).json();
  return data;
};
