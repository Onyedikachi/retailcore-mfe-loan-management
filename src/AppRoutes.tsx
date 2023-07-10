import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { BasePath, RouteMaps, Routes } from './constants';

const router = createBrowserRouter(
   [{ path: BasePath, element: <Navigate to={RouteMaps.productList.path('/deposit')} replace /> }].concat(
      Routes
   )
);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;
