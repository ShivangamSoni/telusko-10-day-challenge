import { Navigate, createBrowserRouter } from 'react-router-dom';

import RootLayout from '@features/site/RootLayout';
import Home from './Home';
import Expired from './Expired';
import ProductDetails from './ProductDetails';
import Search from './Search';
import Place from './Place';
import AddNew from './AddNew';
import NotFound from './NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/products/add',
        element: <AddNew />,
      },
      {
        path: '/products/expired',
        element: <Expired />,
      },
      {
        path: '/products/:id',
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
      {
        path: '/404',
        element: <NotFound />,
      },
      {
        path: '*',
        element: <Navigate to="/404" />,
      },
    ],
  },
]);
