import * as FormMeta from '@app/utils/validators/book-a-loan/transaction-settings';
import FormControlWrapper from '@app/components/forms/FormControlWrapper';
import { Box } from '@mui/material';
import { FormControlBase } from '@app/components/forms/FormControl';
import { useFormikContext } from 'formik';
import { useFormikHelper } from '@app/hooks/useFormikHelper';

export const RepaymentSettingsFields = () => {
   const { InputFieldNames, TooltipText, repaymentAccount, repaymentChannels } = FormMeta;
   const { getFieldProps } = useFormikContext();
   return (
      <Box width="90%" py={2}>
         <FormControlWrapper
            name={InputFieldNames.REPAYMENT_CHANNEL}
            label="Repayment Channel"
            layout="horizontal"
            layoutFlexGrid={[6, 6]}
            tooltipText={TooltipText[InputFieldNames.REPAYMENT_CHANNEL]}
         >
            <FormControlBase
               control="select"
               name={InputFieldNames.REPAYMENT_CHANNEL}
               placeholder="Select"
               options={repaymentChannels}
            />
         </FormControlWrapper>
         {getFieldProps(InputFieldNames.REPAYMENT_CHANNEL)?.value && (
            <FormControlWrapper
               name={InputFieldNames.REPAYMENT_ACCOUNT}
               label="Repayment Account"
               layout="horizontal"
               layoutFlexGrid={[6, 6]}
               tooltipText={TooltipText[InputFieldNames.REPAYMENT_ACCOUNT]}
            >
               <FormControlBase
                  control="select"
                  name={InputFieldNames.REPAYMENT_ACCOUNT}
                  placeholder="Select"
                  options={repaymentAccount}
               />
            </FormControlWrapper>
         )}
      </Box>
   );
};
