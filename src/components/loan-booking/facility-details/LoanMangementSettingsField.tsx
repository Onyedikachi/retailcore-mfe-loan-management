import { Button } from '@app/components/atoms';
import { FormControlBase } from '@app/components/forms/FormControl';
import FormControlWrapper from '@app/components/forms/FormControlWrapper';
import * as FormMeta from '@app/utils/validators/book-a-loan/facility-details';
import { Box,} from '@mui/material';
import { useState } from 'react';
import { useFormikContext } from 'formik';
import { TenureControl } from '@app/components/forms/TenureControl';
export const LoanManagementSettingsField = () => {
   const { InputFieldNames, TooltipText } = FormMeta;
   const [showAddCollateral, setShowAddCollateral] = useState(false);
   const { getFieldProps } = useFormikContext();

   return (
      <Box>
         <FormControlWrapper
            name={InputFieldNames.ENABLE_MORATORIUM_PERIOD}
            label="Enable Moratorium Period"
            layout="horizontal"
            tooltipText={TooltipText[InputFieldNames.ENABLE_MORATORIUM_PERIOD]}
         >
            <FormControlBase
               sx={{ ml: 7 }}
               control="switch"
               name={InputFieldNames.ENABLE_MORATORIUM_PERIOD}
            />
         </FormControlWrapper>
         {getFieldProps(InputFieldNames.ENABLE_MORATORIUM_PERIOD)?.value && (
            <Box pl={3} pr={5}>
               <TenureControl
                  layout="horizontal"
                  fieldLabel="Moratorium Period"
                  periodName={InputFieldNames.MORATORIUM_PERIOD}
                  numberName={InputFieldNames.MORATORIUM_PERIOD_VALUE}
                  periodTooltipText={TooltipText[InputFieldNames.MORATORIUM_PERIOD]}
               />
               <FormControlWrapper
                  name={InputFieldNames.RECOGNISE_MORATORIUM_PERIOD}
                  label="Recognise Moratorium Duration"
                  required
                  layout="horizontal"
                  tooltipText={TooltipText[InputFieldNames.RECOGNISE_MORATORIUM_PERIOD]}
               >
                  <FormControlBase
                     control="select"
                     name={InputFieldNames.RECOGNISE_MORATORIUM_PERIOD}
                     placeholder="Select option"
                     options={FormMeta.recognize_moratorium_period}
                  />
               </FormControlWrapper>
            </Box>
         )}
         <FormControlWrapper
            name={InputFieldNames.ENABLE_GRACE_PERIOD}
            label="Enable Grace Period"
            layout="horizontal"
            tooltipText={TooltipText[InputFieldNames.ENABLE_GRACE_PERIOD]}
         >
            <FormControlBase sx={{ ml: 7 }} control="switch" name={InputFieldNames.ENABLE_GRACE_PERIOD} />
         </FormControlWrapper>
         {getFieldProps(InputFieldNames.ENABLE_GRACE_PERIOD)?.value && (
            <Box pl={3} pr={5}>
               <TenureControl
                  layout="horizontal"
                  fieldLabel="Moratorium Period"
                  periodName={InputFieldNames.GRACE_PERIOD}
                  numberName={InputFieldNames.GRACE_PERIOD_VALUE}
                  periodTooltipText={TooltipText[InputFieldNames.GRACE_PERIOD]}
               />
            </Box>
         )}
      </Box>
   );
};
const loanCategories = [
   'Auto Loan',
   'Debt Consolidation Loan',
   'Emergency Cash Loan',
   'Household Equipment Lease',
   'Auto Loan',
   'Debt Consolidation Loan',
   'Emergency Cash Loan',
   'Household Equipment Lease',
   'Auto Loan',
   'Debt Consolidation Loan',
   'Emergency Cash Loan',
   'Household Equipment Lease',
];
