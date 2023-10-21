import { Permissions } from './permissions';
import { Navigate } from 'react-router-dom';
import { DashbordOverview } from '@app/pages/DashboardOverview';
import { BookIndividualLoan } from '@app/pages/BookIndividualLoan';
import { LoanPerformance } from '@app/pages/LoanPerformance';
import { DashboardSMELoan } from '@app/pages/DashboardSMELoan';
import { DashboardCorperateLoan } from '@app/pages/DashboardCorperateLoan';
import { DashboardIndividualLoan } from '@app/pages/DashboardIndividualLoan';
import { CustomerLoanDetails } from '@app/pages/CustomerLoanDetails';
import { LoanProductDetails } from '@app/pages/LoanProductDetails';

export const BasePath = '/loan-management';
export const BookLoanPath = `${BasePath}/book-loan`;
export const BookIndividualLoanPath = `${BookLoanPath}/individual-loan`;
export const IndividualLoanPath = `${BasePath}/individual`;

export const RouteMaps = {
   root: {
      element: <Navigate to={`${BasePath}/overview`} />,
      path: BasePath,
   },
   dashboardOverview: {
      element: <DashbordOverview />,
      path: `${BasePath}/overview`,
   },
   dashboardIndividual: {
      element: <DashboardIndividualLoan />,
      path: `${BasePath}/individual`,
   },
   dashboardSME: {
      element: <DashboardSMELoan />,
      path: `${BasePath}/sme`,
   },
   dashboardCorporate: {
      element: <DashboardCorperateLoan />,
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
   customerLoanDetails: {
      element: <CustomerLoanDetails />,
      path: `${BasePath}/customer-loan-details`,
   },
   loanProductDetails: {
      element: <LoanProductDetails />,
      path: `${BasePath}/loan-product-details`,
   },
};

export const CustomerLoanDetailsPath = RouteMaps.customerLoanDetails.path;
export const LoanProductPath = RouteMaps.loanProductDetails.path;

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
   DashboardIndividual: {
      absolute: RouteMaps.dashboardIndividual.path,
      relative: '/individual',
      name: 'Individual',
      permissions: [],
   },
   LoanPerformance: {
      absolute: RouteMaps.loanPerformance.path,
      relative: '/loan-performance',
      name: 'Loan Performance',
      permissions: [],
   },
   CustomerLoanDetails: {
      absolute: RouteMaps.customerLoanDetails.path,
      relative: '/customer-loan-details',
      name: 'Customer Loan Details',
      permissions: [],
   },
   LoanProductDetails: {
      absolute: RouteMaps.loanProductDetails.path,
      relative: '/loan-product-details',
      name: 'Customer Loan Details',
   },
};
