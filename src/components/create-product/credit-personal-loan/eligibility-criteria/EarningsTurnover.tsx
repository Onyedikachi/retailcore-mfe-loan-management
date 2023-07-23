import { FormControlBase } from '@app/components/forms/FormControl';
import FormControlWrapper from '@app/components/forms/FormControlWrapper';
import { Grid } from '@mui/material';
import * as FormMeta from '@app/utils/validators/personal-loan/eligibility-criteria';
import RequiredIndicator from '@app/components/atoms/RequiredIndicator';
import { EarningsControl } from '@app/components/forms/EarningsControls';

const EarningsOrTurnover: React.FC<{ formik: any }> = ({ formik }) => {
   const { InputFieldNames, ToolTipText } = FormMeta;
   const earningType = formik.values?.[InputFieldNames.EARNINGS_TYPE];
   const isFixed = earningType === 'fixed';

   return (
      <>
         <FormControlWrapper
            name={InputFieldNames.SET_EARNINGS}
            label="Set up this eligibility criteria?"
            layout="horizontal"
            tooltipText={ToolTipText.earnings}
         >
            <FormControlBase
               sx={{ ml: 7 }}
               control="switch"
               onChange={(e: any) => {
                  !e.target.checked && formik.setFieldValue(InputFieldNames.EARNINGS_TYPE, '');
               }}
               name={InputFieldNames.SET_EARNINGS}
            />
         </FormControlWrapper>
         {formik.values[InputFieldNames.SET_EARNINGS] && (
            <>
               <Grid container>
                  <Grid item xs={2}>
                     Earnings <RequiredIndicator />
                  </Grid>
                  <Grid item xs={10}>
                     <FormControlBase
                        sx={{ mb: 3 }}
                        name={InputFieldNames.EARNINGS_TYPE}
                        control="radio"
                        options={[
                           { label: 'Fixed', value: 'fixed' },
                           { label: '% of Loan Amount', value: 'percent' },
                        ]}
                     />
                     {earningType && (
                        <Grid container sx={{ mb: 3 }}>
                           <EarningsControl
                              firstName={InputFieldNames.EARNINGS_VALUE}
                              secondName={InputFieldNames.EARNINGS_PERIOD_VALUE}
                              thirdName={InputFieldNames.EARNINGS_PERIOD}
                              firstPlaceHolder={isFixed ? 'Enter a amount' : 'Enter a percentage'}
                              thirdPlaceHolder="Select period"
                              formik={formik}
                              bridgeWord="over"
                              {...(isFixed ? { extraLeft: 'NGN' } : { extraRight: '%' })}
                           />
                        </Grid>
                     )}
                  </Grid>
               </Grid>
            </>
         )}
      </>
   );
};

export default EarningsOrTurnover;
