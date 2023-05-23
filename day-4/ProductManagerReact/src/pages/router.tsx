import { createBrowserRouter } from 'react-router-dom';

import RootLayout from '@features/site/RootLayout';
import Home from './Home';
import Expired from './Expired';
import ProductDetails from './ProductDetails';
import Search from './Search';
import Place from './Place';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <>Error</>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/products/expired',
        element: <Expired />,
      },
      {
        path: '/products/:name',
        element: <ProductDetails />,
      },
      {
        path: '/products/search',
        element: <Search />,
      },
      {
        path: '/products/place/:place',
        element: <Place />,
      },
    ],
  },
]);
