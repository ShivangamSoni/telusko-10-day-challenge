import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <>Root Layout</>,
    errorElement: <>Error</>,
    children: [
      {
        index: true,
        element: <>Home</>,
      },
    ],
  },
]);
