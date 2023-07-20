import { FormControlBase } from '@app/components/forms/FormControl';
import FormControlWrapper from '@app/components/forms/FormControlWrapper';
import { Grid } from '@mui/material';
import * as FormMeta from '@app/utils/validators/personal-loan/eligibility-criteria';
import RequiredIndicator from '@app/components/atoms/RequiredIndicator';
import { LoanTenurePeriod } from '@app/constants';
import { CounterControl } from '@app/components/forms/CounterControl';

const EarningsOrTurnover: React.FC<{ formik: any }> = ({ formik }) => {
   const { InputFieldNames, ToolTipText } = FormMeta;
   return (
      <>
         <FormControlWrapper
            name={InputFieldNames.SET_EARNINGS}
            label="Set up this eligibility criteria?"
            layout="horizontal"
            tooltipText={ToolTipText.earnings}
         >
            <FormControlBase sx={{ ml: 7 }} name={InputFieldNames.SET_EARNINGS} control="switch" />
         </FormControlWrapper>
         {formik.values.setEarnings && (
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
                     {formik.values.earningType == 'fixed' && (
                        <Grid container sx={{ mb: 3 }}>
                           <Grid item xs={4} pr={6}>
                              <FormControlBase
                                 name={InputFieldNames.FIXED_EARNING_AMOUNT}
                                 currency
                                 control="input"
                                 placeholder="Enter a amount"
                                 extraLeft="NGN"
                              />
                           </Grid>
                           <Grid item xs={1}>
                              over
                           </Grid>
                           <Grid item xs={3} pr={6}>
                              <CounterControl name={InputFieldNames.FIXED_EARNING_NUM} formik={formik} />
                           </Grid>
                           <Grid item xs={3} pr={4}>
                              <FormControlBase
                                 control="select"
                                 name={InputFieldNames.FIXED_EARNING_PERIOD}
                                 placeholder="Select period"
                                 options={LoanTenurePeriod}
                              />
                           </Grid>
                        </Grid>
                     )}
                     {formik.values.earningType == 'percent' && (
                        <Grid container sx={{ mb: 3 }}>
                           <Grid item xs={4} pr={6}>
                              <FormControlBase
                                 name={InputFieldNames.PERCENTAGE_EARNING_PERCENT}
                                 decimal
                                 control="input"
                                 placeholder="Enter a percentage"
                                 extraRight="%"
                              />
                           </Grid>
                           <Grid item xs={1}>
                              over
                           </Grid>
                           <Grid item xs={3} pr={6}>
                              <CounterControl name={InputFieldNames.PERCENTAGE_EARNING_NUM} formik={formik} />
                           </Grid>
                           <Grid item xs={3} pr={4}>
                              <FormControlBase
                                 control="select"
                                 name={InputFieldNames.PERCENTAGE_EARNING_PERIOD}
                                 placeholder="Select period"
                                 options={LoanTenurePeriod}
                              />
                           </Grid>
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
