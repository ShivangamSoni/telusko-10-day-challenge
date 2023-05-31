import { AdminQuiz } from './type';

export const getQuizzes = async () => {
  const res = await fetch('http://localhost:8080/api/admin/quiz');
  const data: AdminQuiz[] = await res.json();
  return data;
};
