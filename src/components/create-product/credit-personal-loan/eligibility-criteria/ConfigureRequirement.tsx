import { FormControlBase } from '@app/components/forms/FormControl';
import FormControlWrapper from '@app/components/forms/FormControlWrapper';
import { Box, Grid, InputAdornment, styled } from '@mui/material';
import { Formik, Form } from 'formik';
import * as FormMeta from '@app/utils/validators/personal-loan/configure-requirement';
import { Button } from '@app/components/atoms/Button';
import RequiredIndicator from '@app/components/atoms/RequiredIndicator';
import { CounterControl } from '@app/components/forms/CounterControl';
import { Colors, LoanTenurePeriod } from '@app/constants';
import { Icon } from '@app/components/atoms/Icon';
type inputValue = { [key: string]: any };

const ConfigureRequirement: React.FC<{ title: string }> = ({ title }) => {
   const { InputFieldNames } = FormMeta;
   const onSubmit = (values: inputValue) => {};

   return (
      <Box width="75%" mx="auto">
         <Formik
            initialValues={FormMeta.initialValues(title)}
            validationSchema={FormMeta.validator()}
            onSubmit={onSubmit}
         >
            {(formik) => {
               return (
                  <Form>
                     <Box sx={{ mb: 5 }}>
                        <Grid container mb={4}>
                           <Grid item xs={4} pr={3}>
                              Requirement Title
                              <RequiredIndicator />
                           </Grid>
                           <Grid item xs={8}>
                              <FormControlBase control="input" name={InputFieldNames.TITLE} />
                           </Grid>
                        </Grid>
                        <Grid container mb={4}>
                           <Grid item xs={4} pr={3}>
                              Requirement Description
                              <RequiredIndicator />
                           </Grid>
                           <Grid item xs={8}>
                              <FormControlBase
                                 variant="outlined"
                                 control="input"
                                 placeholder="Enter requirement description"
                                 rows={4}
                                 multiline
                                 sx={{
                                    '& .MuiOutlinedInput-root': {
                                       flexDirection: 'column',
                                       alignItems: 'end',
                                    },
                                 }}
                                 name={InputFieldNames.DESCRIPTION}
                                 InputProps={{
                                    endAdornment: (
                                       <InputAdornment position="end">
                                          {`${formik.values[InputFieldNames.DESCRIPTION].length}/160`}
                                       </InputAdornment>
                                    ),
                                 }}
                              />
                           </Grid>
                        </Grid>
                        <Grid container mb={4}>
                           <Grid item xs={4} pr={3}>
                              Periodicity
                           </Grid>

                           <Grid item xs={2} pr={2}>
                              <CounterControl name={InputFieldNames.PERIODICITY_NUM_START} formik={formik} />
                           </Grid>
                           <Grid item xs={0.5}>
                              -
                           </Grid>
                           <Grid item xs={2.5} pr={2}>
                              <CounterControl name={InputFieldNames.PERIODICITY_NUM_END} formik={formik} />
                           </Grid>
                           <Grid item xs={3} pr={2}>
                              <FormControlBase
                                 control="select"
                                 name={InputFieldNames.PERIODICITY_PERIOD}
                                 placeholder="Select period"
                                 options={LoanTenurePeriod}
                              />
                           </Grid>
                        </Grid>
                        <FormControlWrapper
                           sx={{ mb: 4 }}
                           name={InputFieldNames.SET_FORMAT}
                           label="Are documents required for this eligibility requirement?"
                           layout="horizontal"
                        >
                           <FormControlBase
                              sx={{ ml: 7 }}
                              name={InputFieldNames.SET_FORMAT}
                              control="switch"
                           />
                        </FormControlWrapper>
                        {formik.values[InputFieldNames.SET_FORMAT] && (
                           <Grid container mb={4}>
                              <Grid item xs={4} pr={3}>
                                 Accepted Format
                                 <RequiredIndicator />
                              </Grid>
                              <Grid item xs={8}>
                                 <StyledOuterBox>
                                    <StyledInnerBox>
                                       PDF
                                       <Icon color="primary" sx={{ fontSize: '1rem' }} type="close" />
                                    </StyledInnerBox>
                                 </StyledOuterBox>
                                 <Button variant="text" color="inherit" sx={{ p: 2, pb: 0, pl: 0 }}>
                                    <Icon type="add-circle" sx={{ mr: 1 }} /> Add more formats
                                 </Button>
                              </Grid>
                           </Grid>
                        )}
                     </Box>
                     <Box textAlign="center" mt={5} mb={2}>
                        <Button
                           type="submit"
                           sx={{ ml: 2 }}
                           color="primary"
                           disabled={!formik.dirty || !formik.isValid}
                        >
                           Next
                        </Button>
                     </Box>
                  </Form>
               );
            }}
         </Formik>
      </Box>
   );
};

export default ConfigureRequirement;
const StyledOuterBox = styled(Box)(() => ({
   border: `1px solid ${Colors.Primary}`,
   padding: '10px',
   borderRadius: '6px',
   width: 'fit-content',
}));

const StyledInnerBox = styled(Box)(() => ({
   border: `1px solid ${Colors.LightGray}`,
   padding: '0 5px',
   borderRadius: '14px',
   fontSize: '12px',
   width: 'fit-content',
   display: 'flex',
   alignItems: 'center',
}));
