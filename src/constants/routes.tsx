import { Chip } from '@app/components/atoms/Chip';

export const BasePath = '/product/factory';

export const RouteMaps = {
   productList: {
      element: <Chip color="success" label="Approved" />,
      path: (type = '/:productType') => `${BasePath}/list${type}`,
   },
};

export const Routes = Object.values(RouteMaps).map(({ element, path }) => ({
   element,
   path: typeof path === 'function' ? path() : path,
}));
