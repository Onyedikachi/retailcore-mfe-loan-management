import { CreatePersonalLoanCreditProduct } from '@app/pages/CreateLoan';

export const BasePath = '/product/factory';

export const RouteMaps = {
   productList: {
      element: <CreatePersonalLoanCreditProduct />,
      path: (type = '/:productType') => `${BasePath}/list${type}`,
   },
   createCreditPersonalLoan: {
      element: <CreatePersonalLoanCreditProduct />,
      path: (productType = '/:productType', loanType = '/:loanType') =>
         `${BasePath}/create${productType}${loanType}`,
   },
};

export const Routes = Object.values(RouteMaps).map(({ element, path }) => ({
   element,
   path: typeof path === 'function' ? path() : path,
}));
