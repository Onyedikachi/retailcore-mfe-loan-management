import { FormControlBase } from '@app/components/forms/FormControl';
import FormControlWrapper from '@app/components/forms/FormControlWrapper';
import { Grid, Typography } from '@mui/material';
import * as FormMeta from '@app/utils/validators/personal-loan/eligibility-criteria';
import RequiredIndicator from '@app/components/atoms/RequiredIndicator';
import { Colors } from '@app/constants';
import { PercentageControlControl } from '@app/components/forms/PercentageControl';

const EquityContribution: React.FC<{ formik: any }> = ({ formik }) => {
   const { InputFieldNames, ToolTipText } = FormMeta;
   return (
      <>
         <FormControlWrapper
            name={InputFieldNames.SET_EQUITY}
            label="Require equity contribution for this product?"
            layout="horizontal"
            tooltipText={ToolTipText.equity}
         >
            <FormControlBase sx={{ ml: 7 }} name={InputFieldNames.SET_EQUITY} control="switch" />
         </FormControlWrapper>
         {formik.values[InputFieldNames.SET_EQUITY] && (
            <>
               <Grid container>
                  <Grid item marginTop={0.5} xs={2}>
                     Contribution type <RequiredIndicator />
                  </Grid>
                  <Grid item xs={10}>
                     <FormControlBase
                        sx={{ mb: 3 }}
                        name={InputFieldNames.EQUITY_TYPE}
                        control="radio"
                        onChange={() => {
                           formik.setFieldValue(InputFieldNames.EQUITY_VALUE_FROM, '');
                           formik.setFieldError(InputFieldNames.EQUITY_VALUE_FROM, '');
                           formik.setFieldTouched(InputFieldNames.EQUITY_VALUE_FROM, false, false);
                        }}
                        options={[
                           { label: 'Fixed', value: 'fixed' },
                           { label: 'Range', value: 'range' },
                        ]}
                     />
                     {formik.values[InputFieldNames.EQUITY_TYPE] && (
                        <Grid container sx={{ mb: 3 }}>
                           <Grid item xs={4} pr={6}>
                              <Typography>
                                 Contribution <RequiredIndicator />
                              </Typography>
                              <Typography color={Colors.LightGray3} fontSize="14px">
                                 Enter a number in the field
                              </Typography>
                           </Grid>
                           <Grid item xs={4} pr={6}>
                              <PercentageControlControl name={InputFieldNames.EQUITY_VALUE_FROM} withChip />
                           </Grid>
                           {formik.values[InputFieldNames.EQUITY_TYPE] == 'range' && (
                              <Grid item xs={4} pr={6}>
                                 <PercentageControlControl name={InputFieldNames.EQUITY_VALUE_TO} withChip />
                              </Grid>
                           )}
                        </Grid>
                     )}
                  </Grid>
               </Grid>
            </>
         )}
      </>
   );
};

export default EquityContribution;
