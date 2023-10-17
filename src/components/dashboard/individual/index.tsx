import { Filters } from '@app/components/dashboard/DashboardTab';
import { SelectChangeEvent, Stack, styled } from '@mui/material';
import { useState } from 'react';
import { creditFilterOptions, tabOptions, tabCardOptions } from '@app/constants/dashboard';
import { LoanTable } from './LoanTable';

const StyledContentWrapper = styled(Stack)({
   gap: '27px',
   background: 'transparent',
   height: '100%',
   width: '100%',
   paddingRight: '16px',
});

export const IndividualLoan = () => {
   const [tabKey, setTabKey] = useState<string | number>(tabOptions[0]?.key);

   const handleTabChange = (tabKey: number | string) => setTabKey(tabKey);
   const handleStatusChange = (tabKey: number) => setTabKey(tabKey);

   const onFilterOptionSelected = (event: SelectChangeEvent<any>) => {
      // Todo: implement table filter here.
   };

   return (
      <StyledContentWrapper>
         <Filters
            defaultTabKey={tabKey}
            tabKey={tabKey}
            onTabClick={handleTabChange}
            onStatusClick={handleStatusChange}
            statusOptions={tabCardOptions[tabKey]}
            tabOptions={tabOptions}
            onFilterOptionSelected={onFilterOptionSelected}
            filterOptions={creditFilterOptions}
         />
         <LoanTable/>
      </StyledContentWrapper>
   );
};
