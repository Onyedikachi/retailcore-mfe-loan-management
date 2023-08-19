import * as FormMeta from '@app/utils/validators/book-a-loan/charges-taxes-and-penalty-setup';
import FormControlWrapper from '@app/components/forms/FormControlWrapper';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import { FormControlBase } from '@app/components/forms/FormControl';
import { PercentageControl } from '@app/components/forms/PercentageControl';
import { RedBorderContentBox } from '@app/components/atoms/RedBorderBox';

export const PenaltySetupFields = () => {
   const { InputFieldNames, latePaymentPenaltyOptions, TooltipText } = FormMeta;
   const { getFieldProps } = useFormikContext();

   return (
      <>
         <FormControlWrapper
            name={InputFieldNames.CONFIGURE_PENALTY}
            label="Configure penalties for this product?"
            layout="horizontal"
         >
            <FormControlBase sx={{ ml: 7 }} control="switch" name={InputFieldNames.CONFIGURE_PENALTY} />
         </FormControlWrapper>
         {getFieldProps(InputFieldNames.CONFIGURE_PENALTY)?.value && (
            <>
               <Typography display="flex" mb={2}>
                  <InfoOutlinedIcon sx={{ fontSize: 16, mr: 1, mt: 0.5 }} />
                  If an interest rate is specified for any penalty event below, the rate will be added to the
                  already defined loan interest rate and charged against any outstanding repayment.
               </Typography>
               <RedBorderContentBox>
                  <Typography fontWeight="bold" mb={2}>
                     Late Payment
                  </Typography>
                  <Box width="80%">
                     <FormControlWrapper
                        sx={{ mr: 3 }}
                        name={InputFieldNames.LATE_PAYMENT_PENALTY}
                        label="Breach Penalty"
                        layout="horizontal"
                        tooltipText={TooltipText[InputFieldNames.LATE_PAYMENT_PENALTY]}
                     >
                        <FormControlBase
                           control="select"
                           name={InputFieldNames.LATE_PAYMENT_PENALTY}
                           placeholder="Select a penalty"
                           options={latePaymentPenaltyOptions}
                        />
                     </FormControlWrapper>
                     {getFieldProps(InputFieldNames.LATE_PAYMENT_PENALTY)?.value ==
                        latePaymentPenaltyOptions[0] && (
                        <PercentageControl
                           layout="horizontal"
                           label="Interest Rate (%)"
                           placeholder="Enter additional interest rate"
                           name={InputFieldNames.PENALTY_INTEREST_RATE}
                           tooltipText={TooltipText[InputFieldNames.PENALTY_INTEREST_RATE]}
                           withChip
                        />
                     )}
                  </Box>
               </RedBorderContentBox>
            </>
         )}
      </>
   );
};
