import { PageLayout } from '@app/layouts/PageLayout';
import { useEffect, useState } from 'react';
import { BasePath } from '@app/constants';
import { LoanBookingHeader } from '@app/components/loan-booking/Header';
import { useSearchParams } from 'react-router-dom';
import { StyledContentWrapper } from './BookIndividualLoan';
import { Grid } from '@mui/material';
import { SearchLoanProducts } from '@app/components/loan-management/loan-performance/SearchLoanProducts';
import { PerformanceTable } from '@app/components/loan-management/loan-performance/PerformanceTable';

const LoanPerformanceContent: React.FC<{ getSelectedType: (type: string | null) => void }> = ({
   getSelectedType,
}) => {
   const [searchParams] = useSearchParams();
   const type = searchParams.get('type');

   useEffect(() => getSelectedType(type), [type]);

   return (
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
   );
};

export const LoanPerformance = () => {
   const [type, setType] = useState<string | null>('');

   return (
      <PageLayout
         header={
            <LoanBookingHeader
               title={'LOAN MANAGEMENT'}
               backUrl={BasePath}
               pathList={['LOAN MANAGEMENT', 'OVERVIEW', type?.toUpperCase() ?? '']}
            />
         }
         content={<LoanPerformanceContent getSelectedType={(step) => setType(step)} />}
         fullContent={true}
      />
   );
};
