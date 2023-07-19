import { FormControlBase } from '@app/components/forms/FormControl';
import FormControlWrapper from '@app/components/forms/FormControlWrapper';
import {  Box } from '@mui/material';
import * as eligibility from '@app/utils/validators/personal_loan/eligibility-criteria-validator';

const EarningsOrTurnover: React.FC<{ formik: any }> = ({ formik }) => {
   return (
      <>
         <FormControlWrapper
            name={eligibility.SET_EARNINGS}
            label="Set up this eligibility criteria?"
            layout="horizontal"
            tooltipText={eligibility.toolTipText.setEarnings}
         >
            <FormControlBase sx={{ ml: 7 }} name={eligibility.SET_EARNINGS} control="switch" />
         </FormControlWrapper>
         {formik.values.setEarnings && (
            <Box>
               <FormControlWrapper
                  name={eligibility.EARNINGS_TYPE}
                  label="Earnings"
                  layout="horizontal"
                  required
               >
                  <FormControlBase
                     sx={{ ml: 7 }}
                     name={eligibility.EARNINGS_TYPE}
                     control="radio"
                     options={['Fixed', '% of Loan Amount']}
                  />
               </FormControlWrapper>
            </Box>
         )}
      </>
   );
};

export default EarningsOrTurnover;
