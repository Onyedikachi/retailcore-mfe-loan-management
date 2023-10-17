import { BackArrow } from '@app/components/atoms/BackArrow';
import Dialog from '@app/components/atoms/Dialog';
import { PaddedContainer } from '@app/components/containers/PaddedContainer';
import { SterlingLogoWithText } from '@app/components/icons/SterlingLogoWithText';
import { CustomerInfoDialog } from '@app/components/loan-booking/customer-information/CustomerInfoDialoog';
import { BasePath } from '@app/constants';
import { useAppContext } from '@app/providers/app-provider';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { customerLoanInfo } from './customer-loan-details';
import { ActionButtons } from './ActionButtons';
import { Table } from '@app/components/table/Table';
import { TableHeaderProps } from '@app/components/table';
import { repayementScheduleHeaderData, repaymentScheduleBodyData } from './repayment-schedule-data';
import { LoanActionRequest } from './LoanActionRequest';

export const ConstomerLoanDetail = () => {
   const name = 'Temitope Yusuf Chukuma';
   const [openCustomerDetails, setOpenCustomerDetails] = useState(false);
   const [openLoanAction, setOpenLoanAction] = useState(false);
   const [actionType, setActionType] = useState('');
   const { defaultCurrency } = useAppContext();

   const performing: TableHeaderProps = useMemo(
      () => repayementScheduleHeaderData((startDate, endDate) => {}),
      []
   );

   const perfomingTableBody = useMemo(() => {
      return [1, 2, 3, 4, 5].map((item, id) =>
         repaymentScheduleBodyData(defaultCurrency?.abbreviation ?? 'NGN')
      );
   }, []);

   return (
      <Box px={2} pr={0}>
         <Typography display="flex" alignItems="center" fontWeight="600">
            <SterlingLogoWithText sx={{ mr: 1.5 }} /> Loan Mangement
         </Typography>
         <Box className="fancy-scrollbar" sx={{ overflow: 'auto', maxHeight: '510px', pl: 0.2, pr: 2 }}>
            <BackArrow route={BasePath} text="Back" />
            <Typography variant="h5" mt={3}>
               {name}
            </Typography>
            <Button
               variant="text"
               sx={{ p: 0, textTransform: 'initial', fontSize: 14, textDecoration: 'underline', my: 1 }}
               onClick={() => setOpenCustomerDetails(true)}
            >
               View Full Customer Information
            </Button>
            <Typography fontWeight="400">
               <Typography component="span" fontWeight="600" mr={1}>
                  Loan Category:
               </Typography>
               Performing Loan
            </Typography>
            <PaddedContainer sx={{ my: 2, p: 3, pt: 1 }}>
               <Grid container>
                  {customerLoanInfo(defaultCurrency?.abbreviation ?? 'NGN').map(({ key, value }, index) => (
                     <Grid item xs={1.7} mt={3} key={key}>
                        <Typography fontWeight="bold" mb={1} fontSize={14}>
                           {key}
                        </Typography>
                        <Typography fontWeight={400} fontSize={14}>
                           {value}
                        </Typography>
                     </Grid>
                  ))}
               </Grid>
               <Divider sx={{ mt: 3, mb: 2 }} />
               <ActionButtons
                  onClickAction={(action) => {
                     setOpenLoanAction(true);
                     setActionType(action);
                  }}
               />
            </PaddedContainer>
            <Box py={2} px={1}>
               <Typography mb={2} fontWeight="600">
                  Individual Loan Repayment Schedule
               </Typography>
               <Table headerProps={performing} bodyProps={{ rows: perfomingTableBody }} />
            </Box>
         </Box>
         <Dialog
            minHeight="80%"
            open={openCustomerDetails}
            handleClose={() => setOpenCustomerDetails(false)}
            title="Customer's Information"
         >
            <CustomerInfoDialog />
         </Dialog>
         <Dialog
            minWidth="50%"
            open={openLoanAction}
            handleClose={() => setOpenLoanAction(false)}
            title={`LOAN ${actionType.toUpperCase()} REQUEST`}
         >
            <LoanActionRequest action={actionType} />
         </Dialog>
      </Box>
   );
};
