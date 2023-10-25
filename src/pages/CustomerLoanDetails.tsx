import { PageLayout } from '@app/layouts/PageLayout';
import { IndividualLoanPath } from '@app/constants';
import { Header } from '@app/components/Header';
import { StyledContentWrapper } from '@app/components/containers/StyledWrapperContainer';
import { CustomerLoanDetail } from '@app/components/dashboard/individual/customer-loan-details';
import { useIndividualLoanDashboardContext } from '@app/providers/individual-loan-dashboard';

export const CustomerLoanDetails = () => {
   const { loanProduct } = useIndividualLoanDashboardContext();
   const name = loanProduct?.customerName?.toUpperCase();

   return (
      <PageLayout
         header={
            <Header
               title={name ?? ''}
               backRoute={IndividualLoanPath}
               sudmodules={['LOAN MANAGEMENT', name ?? '']}
            />
         }
         content={
            <StyledContentWrapper>
               <CustomerLoanDetail />
            </StyledContentWrapper>
         }
         fullContent={true}
      />
   );
};
