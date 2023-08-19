import { CreateIndividualLoan } from '@app/pages/CreateIndividualLoan';
import { Permissions } from './permissions';
import { Navigate } from 'react-router-dom';
import { DashbordOverview } from '@app/pages/DashboardOverview';

export const BasePath = '/loan-management';
export const CreateLoanPath = `${BasePath}/book-loan`;

export const RouteMaps = {
   root: {
      element: <Navigate to={`${BasePath}/overview`} />,
      path: BasePath,
   },
   dashboardOverview: {
      element: <DashbordOverview />,
      path: `${BasePath}/overview`,
   },
   dashboardPersonal: {
      element: <></>,
      path: `${BasePath}/personal`,
   },
   dashboardSME: {
      element: <></>,
      path: `${BasePath}/sme`,
   },
   dashboardCorporate: {
      element: <></>,
      path: `${BasePath}/corporate`,
   },
   createIndividualLoan: {
      element: <CreateIndividualLoan />,
      path: `${CreateLoanPath}/individual-loan`,
   },
};

export const Routes = Object.values(RouteMaps).map(({ element, path }) => ({
   element,
   path: path,
}));

export const RoutePaths = {
   IndividualLoan: {
      absolute: RouteMaps.createIndividualLoan.path,
      relative: '/individual-loan',
      name: 'Individual Loan',
      permissions: [Permissions.CREATE_CREDIT_PRODUCT],
   },
   DashboardOverview: {
      absolute: RouteMaps.dashboardOverview.path,
      relative: '/overview',
      name: 'Overview',
      Permissions: [],
   },
   DashboardSME: {
      absolute: RouteMaps.dashboardSME.path,
      relative: '/sme',
      name: 'SME',
      Permissions: [],
   },
   DashboardCorporate: {
      absolute: RouteMaps.dashboardCorporate.path,
      relative: '/corporate',
      name: 'Corporate',
      Permissions: [],
   },
   DashboardPersonal: {
      absolute: RouteMaps.dashboardPersonal.path,
      relative: '/personal',
      name: 'Personal',
      Permissions: [],
   },
};
