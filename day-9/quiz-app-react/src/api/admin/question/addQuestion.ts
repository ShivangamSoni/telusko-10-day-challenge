import { AdminQuestionRequest } from './type';

export const addQuestion = async (question: AdminQuestionRequest) => {
  const res = await fetch('http://localhost:8080/api/admin/question', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(question),
  });
  const data: { message: string } = await res.json();
  return data;
};
