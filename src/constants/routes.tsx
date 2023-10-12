import { Permissions } from './permissions';
import { Navigate } from 'react-router-dom';
import { DashbordOverview } from '@app/pages/DashboardOverview';
import { BookIndividualLoan } from '@app/pages/BookIndividualLoan';
import { LoanPerformance } from '@app/pages/LoanPerformance';

export const BasePath = '/loan-management';
export const BookLoanPath = `${BasePath}/book-loan`;

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
   bookIndividualLoan: {
      element: <BookIndividualLoan />,
      path: `${BookLoanPath}/individual-loan`,
   },
   loanPerformance: {
      element: <LoanPerformance />,
      path: `${BasePath}/loan-performance`,
   },
};

export const Routes = Object.values(RouteMaps).map(({ element, path }) => ({
   element,
   path: path,
}));

export const RoutePaths = {
   IndividualLoan: {
      absolute: RouteMaps.bookIndividualLoan.path,
      relative: '/individual-loan',
      name: 'Individual Loan',
      permissions: [Permissions.CREATE_CREDIT_PRODUCT],
   },
   DashboardOverview: {
      absolute: RouteMaps.dashboardOverview.path,
      relative: '/overview',
      name: 'Overview',
      permissions: [],
   },
   DashboardSME: {
      absolute: RouteMaps.dashboardSME.path,
      relative: '/sme',
      name: 'SME',
      permissions: [],
   },
   DashboardCorporate: {
      absolute: RouteMaps.dashboardCorporate.path,
      relative: '/corporate',
      name: 'Corporate',
      permissions: [],
   },
   DashboardPersonal: {
      absolute: RouteMaps.dashboardPersonal.path,
      relative: '/personal',
      name: 'Personal',
      permissions: [],
   },
   LoanPerformance: {
      absolute: RouteMaps.loanPerformance.path,
      relative: '/loan-performance',
      name: 'Loan Performance',
      permissions: [],
   },
};
