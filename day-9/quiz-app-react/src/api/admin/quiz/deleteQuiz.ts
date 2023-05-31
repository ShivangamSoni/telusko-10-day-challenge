export const deleteQuiz = async (id: number) => {
  const res = await fetch(`http://localhost:8080/api/admin/quiz/${id}`, {
    method: 'delete',
  });
  const data = await res.json();

  return { message: data.message, status: res.status } as {
    message: string;
    status: number;
  };
};
