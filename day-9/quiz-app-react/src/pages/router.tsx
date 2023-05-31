import { Navigate, createBrowserRouter } from 'react-router-dom';

import RootLayout from '../layout/RootLayout';
import AdminLayout from '../layout/AdminLayout';

import TechnologyPage from './Admin/TechnologyPage';
import QuestionPage from './Admin/QuestionPage';
import QuizPage from './Admin/QuizPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <h1>Home Page</h1>,
      },
      {
        path: 'admin',
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <Navigate to={'/admin/technology'} replace />,
          },
          {
            path: 'technology',
            element: <TechnologyPage />,
          },
          {
            path: 'question',
            element: <QuestionPage />,
          },
          {
            path: 'quiz',
            element: <QuizPage />,
          },
        ],
      },
    ],
  },
]);
