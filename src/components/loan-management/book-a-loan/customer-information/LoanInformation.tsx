import { Box, Divider, List, Typography } from '@mui/material';
import { AccordionVariant } from '@app/components/accordion/Accordion';

export const LoanInformation = () => {
   return (
      <Box p={2} borderRadius="5px">
         <Typography variant="h5" pb={1}>
            Loan Information
         </Typography>
         <Divider />
         <Box bgcolor="#F9F2F2" py={1} px={2} my={2} borderRadius="6px">
            <Typography>Premier Pay Day Loan</Typography>
            <Typography fontSize={14} pt={1}>
               For financial emergency
            </Typography>
         </Box>
         <Box className="fancy-scrollbar" sx={{ maxHeight: '500px', overflow: 'auto' }}>
            <List>
               <AccordionVariant accordionLabels={loanBookingSections}>
                  <>1</>
                  <>2</>
                  <>3</>
               </AccordionVariant>
            </List>
         </Box>
      </Box>
   );
};

const loanBookingSections = [
   'Facility Details',
   'Collateral & Equity Contribution',
   'Loan Management Settings',
   'Charges & Taxes',
   'Penalty Setup',
   'Disbursement Settings',
   'Accounting Enteries',
];
