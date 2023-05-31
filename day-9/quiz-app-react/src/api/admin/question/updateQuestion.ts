import { AdminQuestionRequest } from './type';

export const updateQuestion = async (
  questionId: number,
  question: AdminQuestionRequest,
) => {
  const res = await fetch(
    `http://localhost:8080/api/admin/question/${questionId}`,
    {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(question),
    },
  );
  const data: { message: string } = await res.json();
  return data;
};
