import * as FormMeta from '@app/utils/validators/book-a-loan/charge-modification';
import { FormControlBase } from '@app/components/forms/FormControl';
import FormControlWrapper from '@app/components/forms/FormControlWrapper';
import { useFormikContext } from 'formik';
import { CounterControl } from '@app/components/forms/CounterControl';
import { Box, Typography } from '@mui/material';
import { TenureControl } from '@app/components/forms/TenureControl';
import { Periodicity3 } from '@app/constants/forms';

export const ConditionsFields = () => {
   const { InputFieldNames, deductionPatternOptions } = FormMeta;
   const { getFieldProps } = useFormikContext<any>();
   return (
      <Box width="80%">
         <FormControlWrapper
            layoutFlexGrid={[6, 6]}
            name={InputFieldNames.INITIATE_CHARGE_DEDUCTION}
            label="Initiate and deduct charge at every occurrence of [Event Name]"
            layout="horizontal"
         >
            <FormControlBase
               sx={{ ml: 7 }}
               control="switch"
               name={InputFieldNames.INITIATE_CHARGE_DEDUCTION}
            />
         </FormControlWrapper>
         {!getFieldProps(InputFieldNames.INITIATE_CHARGE_DEDUCTION).value && (
            <>
               <FormControlWrapper
                  name={InputFieldNames.INITIATE_CHARGE_AFTER}
                  label="Initiate charge after:"
                  layout="horizontal"
               >
                  <Box display="flex">
                     <Box>
                        <CounterControl name={InputFieldNames.INITIATE_CHARGE_AFTER} />
                     </Box>
                     <Typography pl={3}>occurrence of [Event Name]</Typography>
                  </Box>
               </FormControlWrapper>
               <FormControlWrapper
                  name={InputFieldNames.DEDUCTION_PATTERN}
                  label="Deduction pattern:"
                  layout="horizontal"
               >
                  <FormControlBase
                     control="select"
                     name={InputFieldNames.DEDUCTION_PATTERN}
                     placeholder="Select pattern"
                     options={deductionPatternOptions}
                  />
               </FormControlWrapper>
               {getFieldProps(InputFieldNames.DEDUCTION_PATTERN).value &&
                  getFieldProps(InputFieldNames.DEDUCTION_PATTERN).value != deductionPatternOptions[0] && (
                     <>
                        <TenureControl
                           layout="horizontal"
                           fieldLabel="Period"
                           periodName={InputFieldNames.PERIOD}
                           numberName={InputFieldNames.PERIOD_NUM}
                        />
                        <FormControlWrapper
                           name={InputFieldNames.POSTING_FREQUENCY}
                           label="Posting Frequency"
                           layout="horizontal"
                        >
                           <FormControlBase
                              control="select"
                              name={InputFieldNames.POSTING_FREQUENCY}
                              placeholder="Select posting frequency"
                              options={Periodicity3}
                           />
                        </FormControlWrapper>
                     </>
                  )}
            </>
         )}
      </Box>
   );
};
