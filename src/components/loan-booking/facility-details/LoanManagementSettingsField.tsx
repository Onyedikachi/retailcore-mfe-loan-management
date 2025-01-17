import { FormControlBase } from '@app/components/forms/FormControl';
import FormControlWrapper from '@app/components/forms/FormControlWrapper';
import * as FormMeta from '@app/utils/validators/book-a-loan/facility-details';
import { Box } from '@mui/material';
import { useFormikContext } from 'formik';
import { TenureControl } from '@app/components/forms/TenureControl';
import { useFormikHelper } from '@app/hooks/useFormikHelper';
import { useBookLoanContext } from '@app/providers/book-loan';
import { useEffect } from 'react';

export const LoanManagementSettingsField = () => {
   const { InputFieldNames, TooltipText } = FormMeta;
   const { getFieldProps } = useFormikContext();
   const { resetFieldState } = useFormikHelper();
   const { selectedProduct } = useBookLoanContext();

   const penalty: any = selectedProduct?.chargesTaxesPenalty;
   const chargeTaxPen = penalty?.isPenaltyReq;

  
   useEffect(() => {
      resetFieldState(InputFieldNames.GRACE_PERIOD);
      resetFieldState(InputFieldNames.GRACE_PERIOD_VALUE);
      resetFieldState(InputFieldNames.ENABLE_GRACE_PERIOD);
   },[chargeTaxPen]);

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
               onChange={() => {
                  resetFieldState(InputFieldNames.MORATORIUM_PERIOD);
                  resetFieldState(InputFieldNames.MORATORIUM_PERIOD_VALUE);
                  resetFieldState(InputFieldNames.RECOGNISE_MORATORIUM_PERIOD);
               }}
            />
         </FormControlWrapper>
         {getFieldProps(InputFieldNames.ENABLE_MORATORIUM_PERIOD)?.value && (
            <Box pl={3} pr={5}>
               <TenureControl
                  layoutFlexGrid={[6, 6]}
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
                  layoutFlexGrid={[6, 6]}
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
            <FormControlBase
               sx={{ ml: 7 }}
               control="switch"
               name={InputFieldNames.ENABLE_GRACE_PERIOD}
               onChange={() => {
                  resetFieldState(InputFieldNames.GRACE_PERIOD);
                  resetFieldState(InputFieldNames.GRACE_PERIOD_VALUE);
               }}
               disabled={!chargeTaxPen}
            />
         </FormControlWrapper>

         {getFieldProps(InputFieldNames.ENABLE_GRACE_PERIOD)?.value && (
            <Box pl={3} pr={5}>
               <TenureControl
                  layout="horizontal"
                  fieldLabel="Grace Period"
                  periodName={InputFieldNames.GRACE_PERIOD}
                  numberName={InputFieldNames.GRACE_PERIOD_VALUE}
                  periodTooltipText={TooltipText[InputFieldNames.GRACE_PERIOD]}
               />
            </Box>
         )}
      </Box>
   );
};
