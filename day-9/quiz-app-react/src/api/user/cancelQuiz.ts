export const cancelQuiz = async () => {
  const res = await fetch(`http://localhost:8080/api/user/quiz/quit`, {
    method: 'post',
    credentials: 'include',
  });
  const data: {
    message: string;
  } = await res.json();
  return data;
};
