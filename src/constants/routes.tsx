import { Permissions } from './permissions';
import { Navigate } from 'react-router-dom';
import { DashboardOverview } from '@app/pages/DashboardOverview';
import { BookIndividualLoan } from '@app/pages/BookIndividualLoan';
import { LoanPerformance } from '@app/pages/LoanPerformance';
import { DashboardSMELoan } from '@app/pages/DashboardSMELoan';
import { DashboardCorporateLoan } from '@app/pages/DashboardCorporateLoan';
import { DashboardIndividualLoan } from '@app/pages/DashboardIndividualLoan';
import { CustomerLoanDetails } from '@app/pages/CustomerLoanDetails';
import { LoanProductDetails } from '@app/pages/LoanProductDetails';
import { IndividualLoanDashboardProvider } from '@app/providers/individual-loan-dashboard';
import { LoanManagementReview } from '@app/pages/LoanManagementReview';

export const BasePath = '/loan-management';
export const BookLoanPath = `${BasePath}/book-loan`;
export const BookIndividualLoanPath = `${BookLoanPath}/individual-loan`;
export const IndividualLoanPath = `${BasePath}/individual`;

export const RouteMaps = {
   root: {
      element: <Navigate to={`${BasePath}/individual`} />,
      path: BasePath,
   },
   dashboardOverview: {
      element: <DashboardOverview />,
      path: `${BasePath}/overview`,
   },
   dashboardIndividual: {
      element: (
         <IndividualLoanDashboardProvider>
            <DashboardIndividualLoan />
         </IndividualLoanDashboardProvider>
      ),
      path: `${BasePath}/individual`,
   },
   dashboardSME: {
      element: <DashboardSMELoan />,
      path: `${BasePath}/sme`,
   },
   dashboardCorporate: {
      element: <DashboardCorporateLoan />,
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
      element: (
         <IndividualLoanDashboardProvider>
            <CustomerLoanDetails />
         </IndividualLoanDashboardProvider>
      ),
      path: `${BasePath}/customer-loan-details`,
   },
   loanProductDetails: {
      element: (
         <IndividualLoanDashboardProvider>
            <LoanProductDetails />
         </IndividualLoanDashboardProvider>
      ),
      path: `${BasePath}/loan-product-details`,
   },
   loanReview: {
      element: <LoanManagementReview />,
      path: `${BasePath}/review`,
   },
};

export const CustomerLoanDetailsPath = RouteMaps.customerLoanDetails.path;
export const LoanProductPath = RouteMaps.loanProductDetails.path;
export const ReviewLoanPath = RouteMaps.loanReview.path;

export const Routes = Object.values(RouteMaps).map(({ element, path }) => ({
   element,
   path: path,
}));

export const RoutePaths = {
   IndividualLoan: {
      absolute: RouteMaps.bookIndividualLoan.path,
      relative: '/individual-loan',
      name: 'Individual Loan',
      permissions: [Permissions.BOOK_LOAN],
   },
   DashboardOverview: {
      absolute: RouteMaps.dashboardOverview.path,
      relative: '/overview',
      name: 'Overview',
      permissions: [Permissions.VIEW_ALL_LOAN_RECORDS, Permissions.VIEW_ALL_LOAN_REQUESTS],
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
      permissions: [
         Permissions.BOOK_LOAN,
         Permissions.VIEW_ALL_LOAN_RECORDS,
         Permissions.VIEW_ALL_LOAN_REQUESTS,
      ],
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
      permissions: [Permissions.BOOK_LOAN],
   },
   LoanProductDetails: {
      absolute: RouteMaps.loanProductDetails.path,
      relative: '/loan-product-details',
      name: 'Customer Loan Details',
      permissions: [Permissions.BOOK_LOAN],
   },
   LoanReview: {
      absolute: RouteMaps.loanReview.path,
      relative: '/review',
      name: 'Loan Management Review',
      permissions: [Permissions['AUTHORIZE_BOOKING_RESTRUCTURING_REQUESTS']],
   },
};
