import { createBrowserRouter } from 'react-router-dom';

import RootLayout from '@features/site/RootLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <>Error</>,
    children: [
      {
        index: true,
        element: <>Home</>,
      },
    ],
  },
]);
