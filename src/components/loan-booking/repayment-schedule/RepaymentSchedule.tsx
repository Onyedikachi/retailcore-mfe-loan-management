import { Button, Tooltip } from '@app/components/atoms';
import { TableHeaderProps } from '@app/components/table/TableHeader';
import FormContainer from '@app/components/forms/FormContainer';
import AlertDialog from '@app/components/modal/AlertDialog';
import { API_PATH, IndividualLoanPath } from '@app/constants';
import { formattedDate } from '@app/helper/formater';
import { useStepperContext } from '@app/providers';
import { Box, Divider, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useRequest } from 'react-http-query';
import { Table } from '@app/components/table';
import { DateFilter } from '@app/components/calendar/DateFilter';
import { downloadTableAsPDFByID } from '@app/helper/pdfDownloader';
import { useBookLoanContext } from '@app/providers/book-loan';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { mapRepaymentScheduleToSchema } from '@app/mappers/book-loan-mapper';

export const RepaymentSchedule = () => {
   const [isDraft, setIsDraft] = useState(false);
   const { handleNavigation } = useStepperContext();
   const { backendData, selectedProduct, resetBookLoanData, bookLoanData } = useBookLoanContext();
   const currency = selectedProduct?.currency;
   const navigate = useNavigate();
   const [searchParams] = useSearchParams();
   const id = searchParams.get('id');

   const [, submitForm] = useRequest({
      onSuccess: (res) => {
         navigate(IndividualLoanPath);
         handleNavigation(0);
         resetBookLoanData();
      },
   });
   const handleSubmit = () => {
      setIsDraft(false);
      if (id) {
         submitForm(`${API_PATH.IndividualLoan}`, { body: { ...backendData, id: id }, method: 'PUT' });
      } else {
         submitForm(API_PATH.IndividualLoan, { body: backendData });
      }
   };

   const [, getSchedule] = useRequest({
      onSuccess: (res) => console.log(res.data),
   });
   useEffect(() => {
      getSchedule(`${API_PATH.RepaymentSchedule}`, {
         body: mapRepaymentScheduleToSchema(bookLoanData, selectedProduct),
      });
   }, []);

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
      return [].map((item, id) => ({
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
                     id="download-repayment"
                     variant="outlined"
                     onClick={() =>
                        downloadTableAsPDFByID('schedule', 'Loan Repayment Schedule', 'repayment schedule')
                     }
                  >
                     Download
                  </Button>
                  <Button variant="outlined" onClick={() => setIsDraft(true)} id="repayment-save">
                     Save As Draft
                  </Button>
                  <Button onClick={() => handleNavigation('next')} id="repayment-next">
                     Next
                  </Button>
               </Box>
            </Box>
         </FormContainer>
         <AlertDialog
            open={isDraft}
            handleClose={() => setIsDraft(false)}
            handleConfirm={handleSubmit}
            title="Do you want to save as draft?"
            subtitle="Requests in drafts would be deleted after 30 days of inactivity."
         />
      </>
   );
};
