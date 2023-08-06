import { FormControlBase } from '@app/components/forms/FormControl';
import FormControlWrapper from '@app/components/forms/FormControlWrapper';
import * as FormMeta from '@app/utils/validators/book-a-loan/facility-details';
import { Box } from '@mui/material';
export const FacilityDetailsFields = () => {
   const { InputFieldNames, TooltipText } = FormMeta;
   return (
      <Box width="80%">
         <FormControlWrapper
            name={InputFieldNames.PRODUCT_CATEGORY}
            label="Individual Loan Product Category"
            required
            layout="horizontal"
            tooltipText={TooltipText[InputFieldNames.PRODUCT_CATEGORY]}
         >
            <FormControlBase
               control="autocomplete"
               placeholder="Type to search"
               name={InputFieldNames.PRODUCT_CATEGORY}
               noOptionsText="No match"
               options={loanCategories}
               search
            />
         </FormControlWrapper>
      </Box>
   );
};

const loanCategories = [
   'Auto Loan',
   'Debt Consolidation Loan',
   'Emergency Cash Loan',
   'Household Equipment Lease',
];
