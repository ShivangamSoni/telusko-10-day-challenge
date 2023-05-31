import { AdminQuizRequest } from './type';

export const addQuiz = async (quiz: AdminQuizRequest) => {
  const res = await fetch('http://localhost:8080/api/admin/quiz', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(quiz),
  });
  const data: { message: string } = await res.json();
  return data;
};
