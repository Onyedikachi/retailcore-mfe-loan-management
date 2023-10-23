import { DashboardHeader } from '@app/components';
import { IndividualLoan } from '@app/components/dashboard/individual';
import { PageLayout } from '@app/layouts/PageLayout';
import { IndividualLoanDashboardProvider } from '@app/providers/individual-loan-dashboard';

export const DashboardIndividualLoan = () => {
   return (
      <PageLayout
         header={<DashboardHeader />}
         content={
            <IndividualLoanDashboardProvider>
               <IndividualLoan />
            </IndividualLoanDashboardProvider>
         }
         fullContent={false}
      />
   );
};
