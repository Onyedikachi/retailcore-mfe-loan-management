import { AccordionVariant } from '@app/components/accordion/Accordion';
import { SearchInput } from '@app/components/atoms/SearchInput';
import { Box, Typography } from '@mui/material';

export const SearchLoanProducts = () => {
   return (
      <Box sx={{ p: 2, borderRadius: 1, border: '1px solid #E5E9EB', mr: 1.5, height: '100%' }}>
         <Typography fontWeight="bold" textAlign="center" mb={1}>
            Loan Products
         </Typography>
         <SearchInput handleSearch={(text) => {}} placeholder="Search" sx={{ mb: 2 }} />
         <Box>
            <AccordionVariant
               sx={{ '& .MuiAccordionSummary-content': { '& .MuiTypography-root': { fontSize: 14 } } }}
               accordionLabels={['Individual Loans', 'SME Loans', 'Cooperate Loans']}
            >
               <>1</>
               <>2</>
               <>3</>
            </AccordionVariant>
         </Box>
      </Box>
   );
};
