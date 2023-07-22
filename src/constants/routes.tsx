import { CreditPersonalLoan } from '@app/pages/CreditPersonalLoan';
import { Permissions } from './permissions';

export const BasePath = '/product/factory/create/credit';

export const RouteMaps = {
   createCreditPersonalLoan: {
      element: <CreditPersonalLoan />,
      path: (loanType = '/:loanType') => `${BasePath}${loanType}`,
   },
};

export const Routes = Object.values(RouteMaps).map(({ element, path }) => ({
   element,
   path: typeof path === 'function' ? path() : path,
}));

export const RoutePaths = {
   PersonalLoan: {
      absolute: RouteMaps.createCreditPersonalLoan.path('/personal-loans'),
      relative: '/personal-loans',
      name: 'Personal Loans',
      permissions: [Permissions.CREATE_CREDIT_PRODUCT],
   },
};
