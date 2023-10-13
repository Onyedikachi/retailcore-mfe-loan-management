import { AccordionVariant } from '@app/components/accordion/Accordion';
import { SearchInput } from '@app/components/atoms/SearchInput';
import { Colors } from '@app/constants/colors';
import { Box, Typography, styled } from '@mui/material';

export const Container = styled(Box)(() => ({
   padding: '16px',
   borderRadius: 1,
   border: `1px solid ${Colors.LightGray6}`,
   marginRight: 1.5,
   height: '100%',
}));

export const SearchLoanProducts = () => {
   return (
      <Container>
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
      </Container>
   );
};
