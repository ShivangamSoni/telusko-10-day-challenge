import { UserQuiz } from './type';

export const getQuizzesToPlay = async () => {
  const res = await fetch('http://localhost:8080/api/user/quiz');
  const data: UserQuiz[] = await res.json();
  return data;
};
