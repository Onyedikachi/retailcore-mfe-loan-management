import { CreatePersonalLoanCreditProduct } from '@app/pages/create/PersonalLoanCredit';

export const BasePath = '/product/factory';

export const RouteMaps = {
   productList: {
      element: <CreatePersonalLoanCreditProduct />,
      path: (type = '/:productType') => `${BasePath}/list${type}`,
   },
};

export const Routes = Object.values(RouteMaps).map(({ element, path }) => ({
   element,
   path: typeof path === 'function' ? path() : path,
}));
