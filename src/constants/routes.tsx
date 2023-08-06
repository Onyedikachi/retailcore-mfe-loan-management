import { CreateIndividualLoan } from '@app/pages/CreateIndividualLoan';
import { Permissions } from './permissions';
import { LoanManagement } from '@app/components/loan-management/LoanManagement';

export const BasePath = '/loan-management';

export const RouteMaps = {
   loanManagement: {
      element: <LoanManagement />,
      path: BasePath,
   },
};

export const Routes = Object.values(RouteMaps).map(({ element, path }) => ({
   element,
   path: path,
}));

export const RoutePaths = {
   PersonalLoan: {
      absolute: RouteMaps.loanManagement.path,
      relative: '/personal-loans',
      name: 'Personal Loans',
      permissions: [Permissions.CREATE_CREDIT_PRODUCT],
   },
};
