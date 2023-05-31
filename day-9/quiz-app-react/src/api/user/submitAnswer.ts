import { AnswerRequest, Score, UserQuizQuestion } from './type';

export const submitAnswer = async (answer: AnswerRequest) => {
  const res = await fetch(`http://localhost:8080/api/user/quiz/submit`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(answer),
    credentials: 'include',
  });
  const data: {
    question: UserQuizQuestion;
    finished: boolean;
    score: Score;
  } = await res.json();
  return data;
};
