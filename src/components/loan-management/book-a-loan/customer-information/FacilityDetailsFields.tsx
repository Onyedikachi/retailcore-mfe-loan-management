import { Button } from '@app/components/atoms';
import { FormControlBase } from '@app/components/forms/FormControl';
import FormControlWrapper from '@app/components/forms/FormControlWrapper';
import { LoanPrincipalControl } from '@app/components/forms/LoanPrincipalControl';
import { PercentageControl } from '@app/components/forms/PercentageControl';
import { TenureControl } from '@app/components/forms/TenureControl';
import { ModalAddNewDialog } from '@app/components/modal/AddNewDialog';
import { Periodicity2 } from '@app/constants';
import * as FormMeta from '@app/utils/validators/book-a-loan/facility-details';
import { AddCircle } from '@mui/icons-material';
import { Box } from '@mui/material';
import { useState } from 'react';
export const FacilityDetailsFields = () => {
   const { InputFieldNames, TooltipText } = FormMeta;
   const [showAddNew, setShowAddNew] = useState(false);

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
               placeholder="Type to search and select"
               name={InputFieldNames.PRODUCT_CATEGORY}
               noOptionsText="No match"
               options={loanCategories}
               search
               addButton={
                  <>
                     <Box mt={2} display="flex" justifyContent="flex-end">
                        <Button
                           sx={{ py: 0, px: 2 }}
                           onMouseDown={(event) => {
                              event.stopPropagation();
                              setShowAddNew(true);
                           }}
                           color={'gray' as any}
                           id="one-two-three"
                           startIcon={<AddCircle color="inherit" sx={{ m: 0 }} />}
                           variant="text"
                        >
                           Add New Categories
                        </Button>
                     </Box>
                  </>
               }
            />
         </FormControlWrapper>
         <ModalAddNewDialog open={showAddNew} onClose={() => setShowAddNew(false)} onSubmit={(value) => {}} />
         <FormControlWrapper
            name={InputFieldNames.PRODUCT_NAME}
            label="Loan Product Name"
            required
            layout="horizontal"
            tooltipText={TooltipText[InputFieldNames.PRODUCT_NAME]}
         >
            <FormControlBase
               control="input"
               placeholder="Enter product name"
               name={InputFieldNames.PRODUCT_NAME}
            />
         </FormControlWrapper>
         <FormControlWrapper
            name={InputFieldNames.LOAN_PURPOSE}
            label="Loan Purpose"
            required
            layout="horizontal"
            tooltipText={TooltipText[InputFieldNames.LOAN_PURPOSE]}
         >
            <FormControlBase
               control="input"
               placeholder="Enter purpose"
               name={InputFieldNames.LOAN_PURPOSE}
            />
         </FormControlWrapper>
         <LoanPrincipalControl
            mb={3}
            name={InputFieldNames.PRINCIPAL}
            layout="horizontal"
            label="Principal"
            placeholder="Enter amount"
            tooltipText={TooltipText[InputFieldNames.PRINCIPAL]}
         />
         <PercentageControl
            layout="horizontal"
            label="Interest Rate(% per annum)"
            placeholder="Enter rate"
            tooltipText={TooltipText[InputFieldNames.INTEREST_RATE]}
            name={InputFieldNames.INTEREST_RATE}
            withChip
         />
         <TenureControl
            layout="horizontal"
            fieldLabel={'Loan Tenor'}
            periodName={InputFieldNames.LOAN_TENURE_PERIOD}
            numberName={InputFieldNames.LOAN_TENURE_NUM}
            periodTooltipText={TooltipText[InputFieldNames.LOAN_TENURE_PERIOD]}
         />
         <FormControlWrapper
            name={InputFieldNames.REPAYMENT_PATTERN}
            label="Repayment Pattern"
            required
            layout="horizontal"
            tooltipText={TooltipText[InputFieldNames.REPAYMENT_PATTERN]}
         >
            <FormControlBase
               control="select"
               name={InputFieldNames.REPAYMENT_PATTERN}
               placeholder="Select pattern"
               options={FormMeta.repaymentPattern}
            />
         </FormControlWrapper>
         <FormControlWrapper
            name={InputFieldNames.REPAYMENT_FREQUENCY}
            label="Repayment Frequency"
            required
            layout="horizontal"
            tooltipText={TooltipText[InputFieldNames.REPAYMENT_FREQUENCY]}
         >
            <FormControlBase
               control="select"
               name={InputFieldNames.REPAYMENT_FREQUENCY}
               placeholder="Select frequency"
               options={Periodicity2}
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
