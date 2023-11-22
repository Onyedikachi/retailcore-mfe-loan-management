import { PageLayout } from '@app/layouts/PageLayout';
import { IndividualLoanPath } from '@app/constants';
import { Header } from '@app/components/Header';
import { IndividualLoanDashboardProvider } from '@app/providers/individual-loan-dashboard';
import { LoanReview } from '@app/components/dashboard/individual/loan-review';
import { BookLoanProvider } from '@app/providers/book-loan';

export const LoanManagementReview = () => {
   return (
      <PageLayout
         header={
            <Header
               title={'LOAN MANAGEMENT REVIEW'}
               backRoute={IndividualLoanPath}
               sudmodules={['LOAN MANAGEMENT', 'REVIEW']}
            />
         }
         content={
            <IndividualLoanDashboardProvider>
               <BookLoanProvider>
                  <LoanReview />
               </BookLoanProvider>
            </IndividualLoanDashboardProvider>
         }
         fullContent={true}
      />
   );
};
