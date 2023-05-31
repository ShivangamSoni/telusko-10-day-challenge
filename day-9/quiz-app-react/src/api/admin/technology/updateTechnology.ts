export const updateTechnology = async (technologyId: number, name: string) => {
  await fetch(`http://localhost:8080/api/admin/technology/${technologyId}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
    }),
  });
};
