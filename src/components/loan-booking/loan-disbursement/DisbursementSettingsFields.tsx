import * as FormMeta from '@app/utils/validators/book-a-loan/loan-disbursement';
import FormControlWrapper from '@app/components/forms/FormControlWrapper';
import { Box } from '@mui/material';
import { FormControlBase } from '@app/components/forms/FormControl';
import { useFormikContext } from 'formik';
import { useFormikHelper } from '@app/hooks/useFormikHelper';
import { accountNumbers } from '../customer-information/CustomerInformation';

export const DisbursementSettingsFields = () => {
   const { InputFieldNames, TooltipText, disbursementMethods, disbursementAccounts } = FormMeta;
   const { getFieldProps } = useFormikContext();
   const { resetFieldState } = useFormikHelper();
   return (
      <Box width="90%" py={2}>
         <FormControlWrapper
            name={InputFieldNames.DISBURSEMENT_METHOD}
            label="Disbursement Method"
            layout="horizontal"
            tooltipText={TooltipText[InputFieldNames.DISBURSEMENT_METHOD]}
         >
            <FormControlBase
               control="select"
               name={InputFieldNames.DISBURSEMENT_METHOD}
               placeholder="Select"
               onChange={() => resetFieldState(InputFieldNames.DISBURSEMENT_DATE)}
               options={disbursementMethods}
            />
         </FormControlWrapper>
         {getFieldProps(InputFieldNames.DISBURSEMENT_METHOD)?.value == disbursementMethods[1] && (
            <FormControlWrapper
               name={InputFieldNames.DISBURSEMENT_DATE}
               label="Date of disbursement"
               layout="horizontal"
               tooltipText={TooltipText[InputFieldNames.DISBURSEMENT_DATE]}
            >
               <FormControlBase
                  control="input"
                  placeholder="Select date"
                  name={InputFieldNames.DISBURSEMENT_DATE}
               />
            </FormControlWrapper>
         )}
         <FormControlWrapper
            name={InputFieldNames.DISBURSEMENT_ACCOUNT}
            label="Disbursement Account"
            layout="horizontal"
            tooltipText={TooltipText[InputFieldNames.DISBURSEMENT_ACCOUNT]}
         >
            <FormControlBase
               control="select"
               name={InputFieldNames.DISBURSEMENT_ACCOUNT}
               placeholder="Select"
               options={disbursementAccounts}
            />
         </FormControlWrapper>
         {getFieldProps(InputFieldNames.DISBURSEMENT_ACCOUNT)?.value == disbursementAccounts[2] && (
            <FormControlWrapper
               name={InputFieldNames.OTHER_ACCOUNT_NO}
               label="Other Account Number"
               layout="horizontal"
               tooltipText={TooltipText[InputFieldNames.OTHER_ACCOUNT_NO]}
            >
               <FormControlBase
                  control="autocomplete"
                  placeholder="Type to search"
                  name={InputFieldNames.OTHER_ACCOUNT_NO}
                  noOptionsText="No match"
                  options={accountNumbers}
                  search
               />
            </FormControlWrapper>
         )}
         <FormControlWrapper
            name={InputFieldNames.ENABLE_DISBURSEMENT_NOTIFICATION}
            label="Enable Disbursement Notification"
            layout="horizontal"
            tooltipText={TooltipText[InputFieldNames.ENABLE_DISBURSEMENT_NOTIFICATION]}
         >
            <FormControlBase
               control="switch"
               onChange={() => resetFieldState(InputFieldNames.NOTIFICATION_CHANNEL)}
               name={InputFieldNames.ENABLE_DISBURSEMENT_NOTIFICATION}
            />
         </FormControlWrapper>
         {getFieldProps(InputFieldNames.ENABLE_DISBURSEMENT_NOTIFICATION)?.value && (
            <FormControlWrapper
               name={InputFieldNames.NOTIFICATION_CHANNEL}
               label="Notification Channels"
               tooltipText={TooltipText[InputFieldNames.NOTIFICATION_CHANNEL]}
            >
               <FormControlBase
                  control="checkboxGroup"
                  name={InputFieldNames.NOTIFICATION_CHANNEL}
                  options={['Email']}
               />
            </FormControlWrapper>
         )}
      </Box>
   );
};
