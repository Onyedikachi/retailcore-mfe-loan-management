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
import { usePermission } from '@app/hooks/usePermission';
import { MakerLoanTable } from './MakerLoanTable';

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
   const [options, setOption] = useState(individualLoanFilterOptions(tab!)[0]);
   const { isUserAChecker, isSuperAdmin, accessAllRecords, accessAllRequests } = usePermission();
   const checkerOption = options.includes('Sent');
   const { getLoanProducts, dataCount } = useIndividualLoanDashboardContext();

   useRequest({
      onMount: (makeRequest) => {
         makeRequest(`${API_PATH.IndividualLoan}`, { showSuccess: false });
      },
      onSuccess: (response) =>
         getLoanProducts(response.data.data.loan, response.data.data.statistics, tab as string),
   });
   const [, getLoans] = useRequest({
      onSuccess: (response) =>
         getLoanProducts(response.data.data.loan, response.data.data.statistics, tab as string),
   });

   function convertToUppercase(sentence: string): string {
      const lowerCaseSentence = sentence.toLowerCase();
      if (lowerCaseSentence === 'initiated system-wide') {
          return 'INITIATEDBYSYSTEM';
      } else if (lowerCaseSentence === 'sent system-wide') {
          return 'SENTBYSYSTEM';
      } else if (lowerCaseSentence === 'created system-wide') {
          return 'CREATEDBYSYSTEM';
      } else if (lowerCaseSentence === 'approved system-wise') {
          return 'APPROVEDBYSYSTEM';
      }
  
      const result: string = sentence.replace(/[\s-]/g, '').toUpperCase();
      return result;
  }


   useEffect(() => {
      const transformedArray = queryByStatus?.map((item) => item.toUpperCase().replace(/-/g, '_')); 
          if(queryByStatus?.[0] === 'All'){
            getLoans(
               API_PATH.IndividualLoan,{
                  showSuccess: false,
                  query: {
                     initiator: convertToUppercase(options),
                  },
               }
            );
      }else{
         getLoans(
            API_PATH.IndividualLoan,{
               showSuccess: false,
               query: {
                  initiator: convertToUppercase(options),
               status:JSON.stringify(transformedArray),
               },
            }
         );
      }
   
   }, [queryByStatus,options]);

   return (
      <StyledContentWrapper>
         <Filters
            defaultTabKey={tab!}
            tabKey={tab!}
            onTabClick={(tab) => {}}
            onStatusClick={(label) => setQueryByStatus([label])}
            statusOptions={tabCardOptions(dataCount, isUserAChecker&&!isSuperAdmin)[tab!]}
            tabOptions={tabOptions}
            onFilterOptionSelected={(event: SelectChangeEvent<any>) => setOption(event.target.value)}
            filterOptions={individualLoanFilterOptions(
               tab!,
               isUserAChecker,
               accessAllRecords,
               accessAllRequests,
               isSuperAdmin
            )}
         />
         {tab === 'records' ? (
            <LoanTable  checker={checkerOption}/>
         ) : isUserAChecker && !isSuperAdmin && tab === 'requests' ? (
            <CheckerLoanTable />
         ) : isUserAChecker && isSuperAdmin && tab === 'requests' ? (
            <MakerLoanTable />
         ) : (<MakerLoanTable />)}
      </StyledContentWrapper>
   );
};
