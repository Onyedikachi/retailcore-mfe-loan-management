import * as FormMeta from '@app/utils/validators/book-a-loan/charge-modification';
import { FormControlBase } from '@app/components/forms/FormControl';
import FormControlWrapper from '@app/components/forms/FormControlWrapper';
import { Box, styled } from '@mui/material';
import { CurrencyPercentageControl } from '@app/components/forms/CurrencyPercentageControl';
import { useFormikContext } from 'formik';
import { useFormikHelper } from '@app/hooks/useFormikHelper';

const ContentBox = styled(Box)({
   boxShadow: '0px 1px 3px 2px rgba(207, 42, 42, 0.08)',
   padding: '15px 20px',
   borderRadius: '5px',
});
export const ChargeTypeFields = () => {
   const { InputFieldNames, chargeTypeOptions } = FormMeta;
   const { getFieldProps } = useFormikContext<any>();
   const { resetFieldState } = useFormikHelper();
   return (
      <Box width="80%">
         <FormControlWrapper
            sx={{ mb: 0 }}
            name={InputFieldNames.CHARGE_TYPE}
            label="Charge Type"
            required
            layout="horizontal"
         >
            <FormControlBase
               sx={{ mb: 3 }}
               name={InputFieldNames.CHARGE_TYPE}
               control="radio"
               onChange={() => {
                  resetFieldState(InputFieldNames.APPLY);
                  resetFieldState(InputFieldNames.CHARGE);
               }}
               options={chargeTypeOptions}
            />
         </FormControlWrapper>
         {getFieldProps(InputFieldNames.CHARGE_TYPE).value && (
            <>
               {getFieldProps(InputFieldNames.CHARGE_TYPE).value == chargeTypeOptions[1].value && (
                  <FormControlWrapper name={InputFieldNames.APPLY} label="Apply" required layout="horizontal">
                     <FormControlBase
                        control="select"
                        name={InputFieldNames.APPLY}
                        placeholder="Select pattern"
                        options={['Smallest of', 'Largest of']}
                     />
                  </FormControlWrapper>
               )}
               <ContentBox>
                  <CurrencyPercentageControl
                     mb={0}
                     name={InputFieldNames.CHARGE}
                     label="Charge"
                     placeholder="Enter charge"
                     layout="horizontal"
                     labelDescription="Enter an amount in the field or select the percent button to use percent values"
                  />
               </ContentBox>
            </>
         )}
      </Box>
   );
};
