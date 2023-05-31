import { UserQuizQuestion } from './type';

export const startQuiz = async (id: number) => {
  const res = await fetch(`http://localhost:8080/api/user/quiz/${id}/start`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const data: { question: UserQuizQuestion } = await res.json();
  return data;
};
