import { PageLayout } from '@app/layouts/PageLayout';
import { IndividualLoanPath } from '@app/constants';
import { Header } from '@app/components/Header';
import { StyledContentWrapper } from '@app/components/containers/StyledWrapperContainer';
import { ConstomerLoanDetail } from '@app/components/dashboard/individual/customer-loan-details';

export const CustomerLoanDetails = () => {
   const name = 'TEMITOPE YUSUF CHUKWUMA';

   return (
      <PageLayout
         header={
            <Header
               title={name ?? ''}
               backRoute={IndividualLoanPath}
               sudmodules={['LOAN MANAGEMENT', name?.toUpperCase() ?? '']}
            />
         }
         content={
            <StyledContentWrapper>
               <ConstomerLoanDetail />
            </StyledContentWrapper>
         }
         fullContent={true}
      />
   );
};
