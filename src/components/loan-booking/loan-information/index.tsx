import { Box, Divider, List, Typography } from '@mui/material';
import { AccordionVariant } from '@app/components/accordion/Accordion';
import { GridComponent } from './GridComponent';
import { useBookLoanContext } from '@app/providers/book-loan';
import { loanProductSections, details } from './details-data';

export const LoanInformation = () => {
   const { selectedProduct, inputtedPrincipal } = useBookLoanContext();

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
                     {Object.values(details(selectedProduct, inputtedPrincipal)).map((detail, index) =>
                        detail.map(({ key, value, heading }) => (
                           <GridComponent
                              key={key}
                              property={key}
                              value={value?.toString()}
                              heading={heading}
                           />
                        ))
                     )}
                  </AccordionVariant>
               </List>
            </Box>
         )}
      </Box>
   );
};
