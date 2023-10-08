import { CurrencyListResponse } from '@app/@types';
import { Button, Tooltip } from '@app/components/atoms';
import { TableHeaderProps } from '@app/components/table/TableHeader';
import FormContainer from '@app/components/forms/FormContainer';
import AlertDialog from '@app/components/modal/AlertDialog';
import { REQUEST_NAMES } from '@app/constants';
import { getDefaultCurrency } from '@app/helper/currency-helper';
import { formattedDate } from '@app/helper/date-formater';
import { useStepperContext } from '@app/providers';
import { Box, Divider, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useRequestData } from 'react-http-query';
import { Table } from '@app/components/table';
import { DateFilter } from '@app/components/calendar/DateFilter';
import { downloadTableAsPDFByID } from '@app/helper/pdfDownloader';

export const RepaymentSchedule = () => {
   const [isDraft, setIsDraft] = useState(false);
   const { handleNavigation } = useStepperContext();
   const currencies = useRequestData<CurrencyListResponse>(REQUEST_NAMES.CURRENCY_LIST);
   const currency = getDefaultCurrency(currencies)?.abbreviation ?? 'NGN';

   const schedule: TableHeaderProps = useMemo(() => {
      return {
         data: [
            { key: 'date', element: 'DATE', rightIcon: <DateFilter /> },
            { key: 'principal', element: 'PRINCIPAL' },
            { key: 'interest', element: 'INTEREST' },
            { key: 'amountPayable', element: 'AMOUNT PAYABLE' },
            { key: 'outstandingBal', element: 'OUTSTANDING BALANCE' },
            { key: 'gracePeriod', element: 'GRACE PERIOD' },
         ],
      };
   }, []);
   const tableBody = useMemo(() => {
      return [1, 2].map((item, id) => ({
         date: formattedDate('2022-02-22T15:45:00Z'),
         principal: `${currency} 8,333.33`,
         interest: `${currency} 461.67`,
         amountPayable: `${currency} 8,750.00`,
         outstandingBal: `${currency} 8,750.00`,
         gracePeriod: formattedDate('2022-02-25T15:45:00Z'),
      }));
   }, []);
   return (
      <>
         <FormContainer>
            <Typography>
               Loan Repayment Schedule
               <Tooltip text="This is the simulation of the repayment schedule of the borrower based on the repayment pattern and frequency selected" />
            </Typography>

            <Box pt={1} pb={5}>
               <Table id="schedule" headerProps={schedule} bodyProps={{ rows: tableBody }} />
            </Box>

            <Divider />
            <Box display="flex" alignItems="center" justifyContent="space-between" mt={5} mb={2}>
               <Button color={'gray' as any} onClick={() => handleNavigation('back')} variant="outlined">
                  Previous
               </Button>
               <Box display="flex" gap={3}>
                  <Button
                     variant="outlined"
                     onClick={() =>
                        downloadTableAsPDFByID('schedule', 'Loan Repayment Schedule', 'repayment schedule')
                     }
                  >
                     Download
                  </Button>
                  <Button variant="outlined" onClick={() => setIsDraft(!isDraft)}>
                     Save As Draft
                  </Button>
                  <Button onClick={() => handleNavigation('next')}>Next</Button>
               </Box>
            </Box>
         </FormContainer>
         <AlertDialog
            open={isDraft}
            handleClose={() => setIsDraft(false)}
            handleConfirm={() => {}}
            title="Do you want to save as draft?"
            subtitle="Requests in drafts would be deleted after 30 days of inactivity."
         />
      </>
   );
};
