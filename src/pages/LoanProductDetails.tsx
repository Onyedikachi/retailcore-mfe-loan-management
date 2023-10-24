import { PageLayout } from '@app/layouts/PageLayout';
import { CustomerLoanDetailsPath } from '@app/constants';
import { Header } from '@app/components/Header';
import { StyledContentWrapper } from '@app/components/containers/StyledWrapperContainer';
import { LoanProductDetail } from '@app/components/dashboard/individual/loan-product-details';
import { BookLoanProvider } from '@app/providers/book-loan';
import { useSearchParams } from 'react-router-dom';
import { useIndividualLoanDashboardContext } from '@app/providers/individual-loan-dashboard';

export const LoanProductDetails = () => {
   const { loanProduct } = useIndividualLoanDashboardContext();
   const name = loanProduct?.customerName?.toUpperCase() ?? '';
   const [searchParams] = useSearchParams();
   const id = searchParams.get('id');

   return (
      <PageLayout
         header={
            <Header
               title={name}
               backRoute={id ? `${CustomerLoanDetailsPath}?id=${id}` : CustomerLoanDetailsPath}
               sudmodules={['LOAN MANAGEMENT', 'LOAN DETAILS', name]}
            />
         }
         content={
            <BookLoanProvider>
               <StyledContentWrapper>
                  <LoanProductDetail />
               </StyledContentWrapper>
            </BookLoanProvider>
         }
         fullContent={true}
      />
   );
};
