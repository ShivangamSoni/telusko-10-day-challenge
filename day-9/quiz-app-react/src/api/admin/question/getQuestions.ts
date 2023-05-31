import { AdminQuestion } from './type';

export const getQuestions = async () => {
  const res = await fetch('http://localhost:8080/api/admin/question');
  const data: AdminQuestion[] = await res.json();
  return data;
};
