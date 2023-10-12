import { PageLayout } from '@app/layouts/PageLayout';
import { BasePath, CustomerLoanDetailsPath } from '@app/constants';
import { Header } from '@app/components/Header';
import { StyledContentWrapper } from '@app/components/containers/StyledWrapperContainer';
import { LoanProdductDetail } from '@app/components/loan-management/loan-product-details';

export const LoanProductDetails = () => {
   const name = 'Pay Day Loan';

   return (
      <PageLayout
         header={
            <Header
               title={name ?? ''}
               backRoute={CustomerLoanDetailsPath}
               sudmodules={['LOAN MANAGEMENT', 'LOAN DETAILS', name?.toUpperCase() ?? '']}
            />
         }
         content={
            <StyledContentWrapper>
               <LoanProdductDetail />
            </StyledContentWrapper>
         }
         fullContent={true}
      />
   );
};
