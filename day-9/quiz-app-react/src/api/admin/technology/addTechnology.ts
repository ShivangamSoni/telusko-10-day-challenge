export const addTechnology = async (name: string) => {
  await fetch('http://localhost:8080/api/admin/technology', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
    }),
  });
};
