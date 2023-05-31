import { AdminQuizRequest } from './type';

export const updateQuiz = async (quizId: number, quiz: AdminQuizRequest) => {
  const res = await fetch(`http://localhost:8080/api/admin/quiz/${quizId}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(quiz),
  });
  const data: { message: string } = await res.json();
  return data;
};
