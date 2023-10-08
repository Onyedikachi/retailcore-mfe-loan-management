import { Box, Divider, List, Typography } from '@mui/material';
import { AccordionVariant } from '@app/components/accordion/Accordion';
import { useBookLoanContext } from '@app/providers/book-loan';
import { InputFieldNames as FacilityFields } from '@app/utils/validators/book-a-loan/facility-details';
import { FacilityDetailsSummary } from './FacilityDetailsSummary';
import { CollateralAndEquitySummary } from './CollateralAndEquityContribSummary';
import { LoanManagementSummary } from './LoanManagementSummary';
import { DisbursementSummary } from './DisbursementSummary';
import { RepaymentSummary } from './RepaymentSummary';

export const LoanInformation = () => {
   const {
      bookLoanData: { facilityDetails },
   } = useBookLoanContext();
   console.log(facilityDetails);
   return (
      <Box p={2} borderRadius="5px" bgcolor="white" ml={2} height="100%">
         <Typography variant="h5" pb={1}>
            Loan Information
         </Typography>
         <Divider />

         <Box bgcolor="#F9F2F2" py={1} px={2} my={2} borderRadius="6px">
            <Typography>
               {facilityDetails?.[FacilityFields.PRODUCT_NAME]
                  ? facilityDetails?.[FacilityFields.PRODUCT_NAME]
                  : 'Information:'}
            </Typography>
            <Typography fontSize={14} pt={1}>
               {facilityDetails?.[FacilityFields.LOAN_PURPOSE]
                  ? facilityDetails?.[FacilityFields.LOAN_PURPOSE]
                  : 'This panel will display details of the loan product.'}
            </Typography>
         </Box>
         {facilityDetails?.product_name && (
            <Box className="fancy-scrollbar" sx={{ height: 'calc(100% - 130px)', overflow: 'auto' }}>
               <List>
                  <AccordionVariant accordionLabels={loanBookingSections}>
                     <FacilityDetailsSummary />
                     <CollateralAndEquitySummary />
                     <LoanManagementSummary />
                     <DisbursementSummary />
                     <RepaymentSummary />
                  </AccordionVariant>
               </List>
            </Box>
         )}
      </Box>
   );
};

const loanBookingSections = [
   'Facility Details',
   'Collateral & Equity Contribution',
   'Loan Management Settings',
   'Disbursement Settings',
   'Repayment Settings',
];
