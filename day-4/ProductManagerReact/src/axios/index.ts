import axios from 'axios';

export default axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT || 'http://localhost:8080',
});
