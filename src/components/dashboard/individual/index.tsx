import { Filters } from '@app/components/dashboard/DashboardTab';
import { SelectChangeEvent, Stack, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { individualLoanFilterOptions, tabOptions, tabCardOptions } from '@app/constants/dashboard';
import { LoanTable } from './LoanTable';
import { useRequest } from 'react-http-query';
import { API_PATH } from '@app/constants/api-path';
import { useIndividualLoanDashboardContext } from '@app/providers/individual-loan-dashboard';
import { useSearchParams } from 'react-router-dom';
import { CheckerLoanTable } from './CheckerLoanTable';

const StyledContentWrapper = styled(Stack)({
   gap: '27px',
   background: 'transparent',
   height: '100%',
   width: '100%',
   paddingRight: '16px',
});

export const IndividualLoan = () => {
   const [queryByStatus, setQueryByStatus] = useState<string[]>();
   const [searchParams] = useSearchParams();
   const tab = searchParams.get('tab');
   const checker = false;

   const { getLoanProducts, dataCount } = useIndividualLoanDashboardContext();

   useRequest({
      onMount: (makeRequest) => {
         makeRequest(`${API_PATH.IndividualLoan}?All=${true}&Count=${20}`, { showSuccess: false });
      },
      onSuccess: (response) =>
         getLoanProducts(response.data.data.loan, response.data.data.statistics, tab as string),
   });
   const [, getLoans] = useRequest({
      onSuccess: (response) =>
         getLoanProducts(response.data.data.loan, response.data.data.statistics, tab as string),
   });
   useEffect(() => {
      const transformedArray = queryByStatus?.map((item) => item.toUpperCase().replace(/-/g, '_'));
      getLoans(
         `${API_PATH.IndividualLoan}${
            (transformedArray ?? []).length > 0 && !transformedArray?.includes('ALL')
               ? `?status=${JSON.stringify(transformedArray)}`
               : `?All=${true}`
         }`,
         { showSuccess: false }
      );
   }, [queryByStatus]);

   return (
      <StyledContentWrapper>
         <Filters
            defaultTabKey={tab!}
            tabKey={tab!}
            onTabClick={(tab) => {}}
            onStatusClick={(label) => setQueryByStatus([label])}
            statusOptions={tabCardOptions(dataCount, checker)[tab!]}
            tabOptions={tabOptions}
            onFilterOptionSelected={(event: SelectChangeEvent<any>) => {}}
            filterOptions={individualLoanFilterOptions(tab!, checker)}
         />
         {checker && tab === 'requests' ? <CheckerLoanTable /> : <LoanTable />}
      </StyledContentWrapper>
   );
};