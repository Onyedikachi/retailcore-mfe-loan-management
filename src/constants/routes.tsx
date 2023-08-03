import { CreateIndividualLoan } from '@app/pages/CreateIndividualLoan';
import { Permissions } from './permissions';

export const BasePath = '/loan-management';

export const RouteMaps = {
   createIndividualLoan: {
      element: <CreateIndividualLoan />,
      path: (loanType = '/:loanType') => `${BasePath}${loanType}`,
   },
};

export const Routes = Object.values(RouteMaps).map(({ element, path }) => ({
   element,
   path: typeof path === 'function' ? path() : path,
}));

export const RoutePaths = {
   PersonalLoan: {
      absolute: RouteMaps.createIndividualLoan.path('/personal-loans'),
      relative: '/personal-loans',
      name: 'Personal Loans',
      permissions: [Permissions.CREATE_CREDIT_PRODUCT],
   },
};
