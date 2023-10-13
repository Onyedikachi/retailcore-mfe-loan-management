import { PageLayout } from '@app/layouts/PageLayout';
import { BasePath } from '@app/constants';
import { LoanBookingHeader } from '@app/components/loan-booking/Header';
import { useSearchParams } from 'react-router-dom';
import { StyledContentWrapper } from './BookIndividualLoan';
import { Grid } from '@mui/material';
import { SearchLoanProducts } from '@app/components/loan-management/loan-performance/SearchLoanProducts';
import { PerformanceTable } from '@app/components/loan-management/loan-performance/PerformanceTable';

export const LoanPerformance = () => {
   const [searchParams] = useSearchParams();
   const type = searchParams.get('type');

   return (
      <PageLayout
         header={
            <LoanBookingHeader
               title={'LOAN MANAGEMENT'}
               backUrl={BasePath}
               pathList={['LOAN MANAGEMENT', 'OVERVIEW', type?.toUpperCase() ?? '']}
            />
         }
         content={
            <StyledContentWrapper>
               <Grid container>
                  <Grid item xs={2.5}>
                     <SearchLoanProducts />
                  </Grid>
                  <Grid item xs={9.5}>
                     <PerformanceTable />
                  </Grid>
               </Grid>
            </StyledContentWrapper>
         }
         fullContent={true}
      />
   );
};
