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
   const { isUserAChecker, isSuperAdmin, accessAllRecords, accessAllRequests } = usePermission();
   const [options, setOption] = useState(individualLoanFilterOptions(tab!, isUserAChecker, isSuperAdmin)[0]);
   const checkerOption = options.includes('Sent');
   const { getLoanProducts, dataCount } = useIndividualLoanDashboardContext();

   // useRequest({
   //    onMount: (makeRequest) => {
   //       makeRequest(`${API_PATH.IndividualLoan}`, { showSuccess: false });
   //    },
   //    onSuccess: (response) =>
   //       getLoanProducts(response.data.data.loan, response.data.data.statistics, tab as string),
   // });

   const [, getLoans] = useRequest({
      onSuccess: (response) =>
         getLoanProducts(response.data.data.loan, response.data.data.statistics, tab as string),
   });

   //    useEffect(() => {
   //       const transformedArray = queryByStatus?.map((item) => item.toUpperCase().replace(/-/g, '_'));
   //       if (queryByStatus?.[0] === 'All') getLoans(API_PATH.IndividualLoan, {
   //             showSuccess: false,
   //             query: {
   //                initiator: convertToUppercase(options),
   //                Count:600,
   //             },
   //          });

   //          setTimeout(() => {
   //             getLoans(API_PATH.IndividualLoan, {
   //                showSuccess: false,
   //                query: {
   //                   Count: 700,
   //                   initiator: convertToUppercase(options),
   //                   status: JSON.stringify(transformedArray),
   //                },
   //             });
   //          }, 4000);
   //       }

   // , [queryByStatus, options]);

   useEffect(() => {
      const fetchData = async () => {
         const transformedArray = queryByStatus?.map((item) => item.toUpperCase().replace(/-/g, '_'));

         if (queryByStatus?.[0] === 'All') {
            await getLoans(API_PATH.IndividualLoan, {
               showSuccess: false,
               query: {
                  initiator: convertToUppercase(options),
                  Count: 600,
               },
            });
         }

         await getLoans(API_PATH.IndividualLoan, {
            showSuccess: false,
            query: {
               Count: 700,
               initiator: convertToUppercase(options),
               status: JSON.stringify(transformedArray),
            },
         });
      };

      fetchData();
   }, [queryByStatus, options]);

   return (
      <StyledContentWrapper>
         <Filters
            defaultTabKey={tab!}
            tabKey={tab!}
            onTabClick={(tab) => {}}
            onStatusClick={(label) => setQueryByStatus([label])}
            statusOptions={tabCardOptions(dataCount, isUserAChecker && !isSuperAdmin)[tab!]}
            tabOptions={tabOptions}
            onFilterOptionSelected={(event: SelectChangeEvent<any>) => setOption(event.target.value)}
            // eslint-disable-next-line max-len
            filterOptions={
               tab === 'records'
                  ? filterOptionsRecords(isUserAChecker, isSuperAdmin)
                  : filterOptionsRequest(isUserAChecker, isSuperAdmin)
            }
         />
         {tab === 'records' ? (
            <LoanTable checker={checkerOption} />
         ) : isUserAChecker && !isSuperAdmin && tab === 'requests' ? (
            <CheckerLoanTable />
         ) : (
            <MakerLoanTable />
         )}
      </StyledContentWrapper>
   );
};
export const convertToUppercase = (sentence: string): string => {
   const lowerCaseSentence = sentence.toLowerCase();
   if (lowerCaseSentence === 'initiated system-wide') {
      return 'INITIATEDBYSYSTEM';
   } else if (lowerCaseSentence === 'sent system-wide') {
      return 'SENTTOSYSTEM';
   } else if (lowerCaseSentence === 'created system-wide') {
      return 'CREATEDBYSYSTEM';
   } else if (lowerCaseSentence === 'approved system-wide') {
      return 'APPROVEDBYSYSTEM';
   }

   const result: string = sentence.replace(/[\s-]/g, '').toUpperCase();
   return result;
};

export const filterOptionsRequest = (isChecker: any, isSuperAdmin: any) => {
   if (isChecker! && !isSuperAdmin!) {
      return ['Sent to me', 'Sent system-wide'];
   } else if (isChecker! && isSuperAdmin!) {
      return ['Initiated by me', 'Initiated system-wide', 'Sent to me', 'Sent system-wide'];
   } else {
      return ['Initiated by me', 'Initiated system-wide'];
   }
};

export const filterOptionsRecords = (isChecker: any, isSuperAdmin: any) => {
   if (isChecker && !isSuperAdmin) {
      return ['Approved by me', 'Approved system-wide'];
   } else if (isChecker && isSuperAdmin) {
      return ['Created by me', 'Created system-wide', 'Approved by me', 'Approved system-wide'];
   } else {
      return ['Created by me', 'Created system-wide'];
   }
};
