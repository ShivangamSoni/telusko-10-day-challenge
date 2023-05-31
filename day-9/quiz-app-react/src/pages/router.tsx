import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layout/RootLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <h1>Home Page</h1>,
      },
    ],
  },
]);
