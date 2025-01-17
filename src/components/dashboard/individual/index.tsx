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
   const [activeChecker, setActiveChecker] = useState<any>();
   const { isUserAChecker, isSuperAdmin } = usePermission();
   const [options, setOption] = useState<any>('');
   const [selectedOptions, setSelectedOption] = useState<any>('');
   const [stat, setStat] = useState<any>();
   const [allValue] = useState(false);

   const [, fetchAllProductStat] = useRequest({
      onSuccess: (response) => {
         setStat(response.data?.data?.statistics);
      },
   });

   const fetchProductActivities = () => {
      fetchAllProductStat(API_PATH.LoanStat, {
         showSuccess: false,
         query: {
            all: allValue,
         },
      });
   };

   useEffect(() => {
      fetchProductActivities();
   }, [allValue]);

   // const checkerOption = options?.includes('Sent');
   const { getLoanProducts } = useIndividualLoanDashboardContext();

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

   useEffect(() => {
      setTimeout(() => {
         const setSTRING = individualLoanFilterOptions(tab!, isUserAChecker, isSuperAdmin)[0];
         setOption(setSTRING);
      }, 1400);
   }, [options]);

   useEffect(() => {
      setTimeout(() => {
         setActiveChecker(isUserAChecker);
      }, 1000);

      const fetchData = () => {
         const transformedArray = queryByStatus?.map((item) => item.toUpperCase().replace(/-/g, '_'));
         if (transformedArray?.[0] === 'ALL') {
            getLoans(API_PATH.IndividualLoan, {
               showSuccess: false,
               query: {
                  initiator: convertToUppercase(options),
                  Count: 600,
               },
            });
         } else {
            getLoans(API_PATH.IndividualLoan, {
               showSuccess: false,
               query: {
                  Count: 709,
                  initiator: selectedOptions
                     ? convertToUppercase(selectedOptions)
                     : convertToUppercase(options),
                  status: JSON.stringify(transformedArray),
               },
            });
         }
      };
      fetchData();
   }, [queryByStatus, options, activeChecker, selectedOptions]);

   return (
      <StyledContentWrapper>
         <Filters
            defaultTabKey={tab!}
            tabKey={tab!}
            onTabClick={(tab) => {}}
            onStatusClick={(label) => setQueryByStatus([label])}
            statusOptions={tabCardOptions(stat, isUserAChecker && !isSuperAdmin)[tab!]}
            // statusOptions={tabCardOptions(dataCount, isUserAChecker && !isSuperAdmin)[tab!]}
            tabOptions={tabOptions}
            onFilterOptionSelected={(event: SelectChangeEvent<any>) => {
               setSelectedOption(event.target.value);
            }}
            // eslint-disable-next-line max-len
            filterOptions={
               tab === 'records'
                  ? filterOptionsRecords(Boolean(isUserAChecker), Boolean(isSuperAdmin))
                  : filterOptionsRequest(Boolean(isUserAChecker), Boolean(isSuperAdmin))
            }
         />
         {tab === 'records' ? (
            <LoanTable checker={activeChecker} />
         ) : isUserAChecker && !isSuperAdmin && tab === 'requests' ? (
            <CheckerLoanTable />
         ) : (
            <MakerLoanTable />
         )}
      </StyledContentWrapper>
   );
};
export const convertToUppercase = (sentence?: string): string => {
   const lowerCaseSentence = sentence?.toLowerCase();
   if (lowerCaseSentence === 'initiated system-wide') {
      return 'INITIATEDBYSYSTEM';
   } else if (lowerCaseSentence === 'sent system-wide') {
      return 'SENTTOSYSTEM';
   } else if (lowerCaseSentence === 'created system-wide') {
      return 'CREATEDBYSYSTEM';
   } else if (lowerCaseSentence === 'approved system-wide') {
      return 'APPROVEDBYSYSTEM';
   }

   const result: any = sentence?.replace(/[\s-]/g, '').toUpperCase();
   return result;
};

export const filterOptionsRequest = (isChecker: boolean, isSuperAdmin: boolean) => {
   if (isChecker && !isSuperAdmin) {
      return ['Sent to me', 'Sent system-wide'];
   } else if (isChecker && isSuperAdmin) {
      return ['Initiated by me', 'Initiated system-wide', 'Sent to me', 'Sent system-wide'];
   } else {
      return ['Initiated by me', 'Initiated system-wide'];
   }
};

export const filterOptionsRecords = (isChecker: boolean, isSuperAdmin: boolean) => {
   if (isChecker && !isSuperAdmin) {
      return ['Approved by me', 'Approved system-wide'];
   } else if (isChecker && isSuperAdmin) {
      return ['Created by me', 'Created system-wide', 'Approved by me', 'Approved system-wide'];
   } else {
      return ['Created by me', 'Created system-wide'];
   }
};
