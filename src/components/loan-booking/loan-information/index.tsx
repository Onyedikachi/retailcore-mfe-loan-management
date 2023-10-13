import { Box, Divider, List, Typography } from '@mui/material';
import { AccordionVariant } from '@app/components/accordion/Accordion';
import { GridComponent } from './GridComponent';

export const LoanInformation = () => {
   return (
      <Box p={2} borderRadius="5px" bgcolor="white" ml={2} height="100%">
         <Typography variant="h5" pb={1}>
            Loan Information
         </Typography>
         <Divider />

         <Box bgcolor="#F9F2F2" py={1} px={2} my={2} borderRadius="6px">
            <Typography>Pay Day loan informatieeion</Typography>
            <Typography fontSize={14} pt={1}>
               'This panel will display details of the loan product.
            </Typography>
         </Box>
         <Box className="fancy-scrollbar" sx={{ height: 'calc(100% - 130px)', overflow: 'auto' }}>
            <List>
               <AccordionVariant accordionLabels={loanProductSections}>
                  {Object.values(details).map((detail, index) =>
                     detail.map(({ key, value }) => {
                        console.log(index);
                        return index != 1 ? (
                           <GridComponent key={key} property={key} value={value} />
                        ) : (
                           <>
                              <Typography sx={{ textDecoration: 'underline', fontSize: 13, mb: 2 }}>
                                 Applicable collateral assets
                              </Typography>
                              <GridComponent property={`Collateral 1`} value={''} />
                              <Typography sx={{ textDecoration: 'underline', fontSize: 13, mb: 2 }}>
                                 Equity Contribution
                              </Typography>
                              <GridComponent property={'Contribution'} value={''} />
                           </>
                        );
                     })
                  )}
               </AccordionVariant>
            </List>
         </Box>
      </Box>
   );
};

const loanProductSections = [
   'Facility Details',
   'Collateral & Equity Contribution',
   'Loan Management Settings',
   'Disbursement Settings',
   'Repayment Settings',
];

const details = {
   facilityDetails: [
      { key: 'Currency', value: 'NGN' },
      { key: 'Principal', value: '' },
      { key: 'Interest rate', value: '' },
      { key: 'Loan Tenor', value: '' },
      { key: 'Repayment Pattern', value: '' },
      { key: 'Repayment Frequency', value: '' },
      { key: 'Repayment Start Date', value: '' },
   ],
   collateral: [{ key: 'collateral', value: '' }],
   loanManagementSettings: [
      { key: 'Moratorium Period', value: '' },
      { key: 'Duration', value: '' },
      { key: 'Grace Period', value: '' },
   ],
   disbursementSettings: [
      { key: 'Disbursement Method', value: '' },
      { key: 'Disbursement Date', value: '' },
      { key: 'Disbursement Account', value: '' },
      { key: 'Other Account No', value: '' },
      { key: 'Notification channel', value: '' },
   ],
   repaymentSetting: [
      { key: 'Repayment Channel', value: '' },
      { key: 'Repayment Account', value: '' },
   ],
};
