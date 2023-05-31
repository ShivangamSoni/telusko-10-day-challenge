import { Technology } from './type';

export const getTechnologies = async () => {
  const res = await fetch('http://localhost:8080/api/admin/technology');
  const data: Technology[] = await res.json();
  return data;
};
