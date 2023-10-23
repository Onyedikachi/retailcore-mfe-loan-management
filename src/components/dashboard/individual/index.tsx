import { Filters } from '@app/components/dashboard/DashboardTab';
import { SelectChangeEvent, Stack, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { individualLoanFilterOptions, tabOptions, tabCardOptions } from '@app/constants/dashboard';
import { LoanTable } from './LoanTable';
import { useRequest } from 'react-http-query';
import { API_PATH } from '@app/constants/api-path';
import { useIndividualLoanDashboardContext } from '@app/providers/individual-loan-dashboard';

const StyledContentWrapper = styled(Stack)({
   gap: '27px',
   background: 'transparent',
   height: '100%',
   width: '100%',
   paddingRight: '16px',
});

export const IndividualLoan = () => {
   const [tabKey, setTabKey] = useState<string | number>(tabOptions[0]?.key);
   const [queryByStatus, setQueryByStatus] = useState<string[]>();

   const handleTabChange = (tabKey: number | string) => {
      console.log(tabKey);
      setTabKey(tabKey);
   };

   const { getLoanProducts, dataCount } = useIndividualLoanDashboardContext();
   const [initiator, setInitiator] = useState(individualLoanFilterOptions(tabKey)[0]);

   useRequest({
      onMount: (makeRequest) => makeRequest(`${API_PATH.IndiviualLoan}?All=${true}`, { showSuccess: false }),
      onSuccess: (response) =>
         getLoanProducts(response.data.data.loan, response.data.data.statistics, tabKey as string),
   });
   const [, getLoans] = useRequest({
      onSuccess: (response) =>
         getLoanProducts(response.data.data.loan, response.data.data.statistics, tabKey as string),
   });
   useEffect(() => {
      const transformedArray = queryByStatus?.map((item) => item.toUpperCase().replace(/-/g, '_'));
      getLoans(
         `${API_PATH.IndiviualLoan}${
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
            defaultTabKey={tabKey}
            tabKey={tabKey}
            onTabClick={handleTabChange}
            onStatusClick={(label) => setQueryByStatus([label])}
            statusOptions={tabCardOptions(dataCount)[tabKey]}
            tabOptions={tabOptions}
            onFilterOptionSelected={(event: SelectChangeEvent<any>) => setInitiator(event.target.value)}
            filterOptions={individualLoanFilterOptions(tabKey)}
         />
         <LoanTable />
      </StyledContentWrapper>
   );
};
