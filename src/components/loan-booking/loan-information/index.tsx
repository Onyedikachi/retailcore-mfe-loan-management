import { Box, Divider, List, Typography } from '@mui/material';
import { AccordionVariant } from '@app/components/accordion/Accordion';
import { GridComponent } from './GridComponent';
import { useBookLoanContext } from '@app/providers/book-loan';
import { LoanProductData } from '@app/@types/loan-product';

export const LoanInformation = () => {
   const { selectedProduct } = useBookLoanContext();

   return (
      <Box p={2} borderRadius="5px" bgcolor="white" ml={2} height="100%">
         <Typography variant="h5" pb={1}>
            Loan Information
         </Typography>
         <Divider />

         <Box bgcolor="#F9F2F2" py={1} px={2} my={2} borderRadius="6px">
            <Typography> {selectedProduct?.name ? selectedProduct?.name : 'Information:'}</Typography>
            <Typography fontSize={14} pt={1}>
               This panel will display details of the loan product.
            </Typography>
         </Box>
         {selectedProduct && (
            <Box className="fancy-scrollbar" sx={{ height: 'calc(100% - 130px)', overflow: 'auto' }}>
               <List>
                  <AccordionVariant accordionLabels={loanProductSections}>
                     {Object.values(details(selectedProduct)).map((detail, index) =>
                        detail.map(({ key, value }) => {
                           return index != 1 ? (
                              <GridComponent key={key} property={key} value={value?.toString()} />
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
         )}
      </Box>
   );
};

const loanProductSections = [
   'Facility Details',
   'Collateral & Equity Contribution',
   'Loan Management Settings',
   'Charges & Taxes',
   'Penalty Setup',
   'Disbursement Settings',
   'Repayment Settings',
   'Account Entires',
];

const details = (selectedProduct: LoanProductData | undefined) => {
   return {
      facilityDetails: [
         { key: 'Currency', value: selectedProduct?.currency },
         { key: 'Min. Principal', value: selectedProduct?.minLoanPrincipal },
         { key: 'Max. Principal', value: selectedProduct?.maxLoanPrincipal },
         { key: 'Min. Interest Rate', value: selectedProduct?.minInterestRate },
         { key: 'Max. Interest Rate', value: selectedProduct?.maxInterestRate },
         {
            key: 'Min. Loan Tenor',
            value: `${selectedProduct?.minLoanTenure} ${selectedProduct?.minLoanTenurePeriod}`,
         },
         {
            key: 'Max. Tenor',
            value: `${selectedProduct?.maxLoanTenure} ${selectedProduct?.maxLoanTenurePeriod}`,
         },
      ],
      collateral: [{ key: 'collateral', value: '' }],
      loanManagementSettings: [
         { key: 'Moratorium Period', value: '' },
         { key: 'Duration', value: '' },
         { key: 'Grace Period', value: '' },
      ],
      chargesAndTaxes: [
         { key: 'Disbursement Method', value: '' },
         { key: 'Disbursement Date', value: '' },
         { key: 'Disbursement Account', value: '' },
         { key: 'Other Account No', value: '' },
         { key: 'Notification channel', value: '' },
      ],
      penaltySetup: [
         { key: 'Repayment Channel', value: '' },
         { key: 'Repayment Account', value: '' },
      ],
      disbursementSetting: [],
      repaymentSetting: [],
      accountEntries: [],
   };
};
