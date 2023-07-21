import { BasePath, Routes } from './constants';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './Root';

const router = createBrowserRouter([
   {
      path: BasePath,
      element: <Root />,
      children: Routes,
   },
]);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;
