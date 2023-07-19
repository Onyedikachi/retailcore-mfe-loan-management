import { Box, Divider, Grid, InputAdornment, Typography } from '@mui/material';
import FormContainer from '../../../form_container';
import { Button } from '@app/components/atoms';
import { FormControlBase } from '@app/components/forms/FormControl';
import FormControlWrapper from '@app/components/forms/FormControlWrapper';
import { Formik, Form } from 'formik';
import * as productInfo from '@app/utils/validators/personal_loan/product_info_validators';
import { Colors } from '@app/constants';
import ValueIncrementDecrement from '@app/components/value_increase_decrease';
type inputValue = { [key: string]: any };

const ProductInfo: React.FC = () => {
   const onSubmit = (values: inputValue) => {
      console.log(values);
   };

   return (
      <FormContainer>
         <Formik
            initialValues={productInfo.productInfoInitialValues}
            validationSchema={productInfo.productInfoValidator}
            onSubmit={onSubmit}
         >
            {(formik) => {
               return (
                  <Form>
                     <Box sx={{ mb: 5 }}>
                        {/* Product name */}
                        <FormControlWrapper
                           name={productInfo.PRODUCT_NAME}
                           label="Product Name"
                           required
                           tooltipText={productInfo.toolTipText.productName}
                        >
                           <FormControlBase
                              name={productInfo.PRODUCT_NAME}
                              control="input"
                              placeholder="Enter the product name"
                              InputProps={{
                                 endAdornment: (
                                    <InputAdornment position="end">
                                       <Typography color={Colors.LightGray3}>0/50</Typography>
                                    </InputAdornment>
                                 ),
                              }}
                           />
                        </FormControlWrapper>

                        {/* Description */}
                        <FormControlWrapper
                           name={productInfo.DESCRIPTION}
                           label="Description"
                           required
                           tooltipText={productInfo.toolTipText.description}
                        >
                           <FormControlBase
                              control="input"
                              multiline
                              rows={4}
                              variant="outlined"
                              placeholder="Enter a detailed description"
                              name={productInfo.DESCRIPTION}
                           />
                        </FormControlWrapper>

                        <Grid container>
                           {/* Product currency */}

                           <Grid item xs={4} pr={6}>
                              <FormControlWrapper
                                 name={productInfo.PRODUCT_CURRENCY}
                                 label="Product Currency"
                                 required
                                 tooltipText={productInfo.toolTipText.productCurrency}
                              >
                                 <FormControlBase
                                    control="select"
                                    name={productInfo.PRODUCT_CURRENCY}
                                    placeholder="Select a product currency"
                                    options={['NG', 'USD', 'EUR']}
                                 />
                              </FormControlWrapper>
                           </Grid>

                           {/* Min loan Tenure */}
                           <Grid item xs={4} pr={6}>
                              <FormControlWrapper
                                 name={productInfo.MIN_LOAN_TENURE_PERIOD}
                                 label="Minimum Loan Tenure"
                                 required
                                 tooltipText={productInfo.toolTipText.minLoanTenurePeriod}
                              >
                                 <Grid container>
                                    <Grid item xs={4}>
                                       <FormControlBase
                                          sx={{ mr: 2 }}
                                          name={productInfo.MIN_LOAN_TENURE_NUM}
                                          allow="number"
                                          control="input"
                                          placeholder="0"
                                          InputProps={{
                                             endAdornment: (
                                                <InputAdornment position="end">
                                                   <ValueIncrementDecrement
                                                      formik={formik}
                                                      fieldName={productInfo.MIN_LOAN_TENURE_NUM}
                                                   />
                                                </InputAdornment>
                                             ),
                                          }}
                                       />
                                    </Grid>
                                    <Grid item xs={8}>
                                       <FormControlBase
                                          control="select"
                                          name={productInfo.MIN_LOAN_TENURE_PERIOD}
                                          placeholder="Select period"
                                          options={productInfo.loanTenurePeriod}
                                       />
                                    </Grid>
                                 </Grid>
                              </FormControlWrapper>
                           </Grid>

                           {/* Max loan Tenure */}
                           <Grid item xs={4} pr={6}>
                              <FormControlWrapper
                                 name={productInfo.MAX_LOAN_TENURE_PERIOD}
                                 label="Maximum Loan Tenure"
                                 required
                                 tooltipText={productInfo.toolTipText.maxLoanTenurePeriod}
                              >
                                 <Grid container>
                                    <Grid item xs={4}>
                                       <FormControlBase
                                          sx={{ mr: 2 }}
                                          name={productInfo.MAX_LOAN_TENURE_NUM}
                                          allow="number"
                                          control="input"
                                          placeholder="0"
                                          InputProps={{
                                             endAdornment: (
                                                <InputAdornment position="end">
                                                   <ValueIncrementDecrement
                                                      formik={formik}
                                                      fieldName={productInfo.MAX_LOAN_TENURE_NUM}
                                                   />
                                                </InputAdornment>
                                             ),
                                          }}
                                       />
                                    </Grid>
                                    <Grid item xs={8}>
                                       <FormControlBase
                                          control="select"
                                          name={productInfo.MAX_LOAN_TENURE_PERIOD}
                                          placeholder="Select period"
                                          options={productInfo.loanTenurePeriod}
                                       />
                                    </Grid>
                                 </Grid>
                              </FormControlWrapper>
                           </Grid>
                        </Grid>

                        <Grid container>
                           {/* Min loan principal */}
                           <Grid item xs={4} pr={6}>
                              <FormControlWrapper
                                 name={productInfo.MIN_LOAN_PRINCIPAL}
                                 label="Minimum Loan Principal"
                                 required
                                 tooltipText={productInfo.toolTipText.minLoanPrincipal}
                              >
                                 <FormControlBase
                                    name={productInfo.MIN_LOAN_PRINCIPAL}
                                    control="input"
                                    currency
                                    placeholder="1"
                                    extraLeft="NGN"
                                 />
                              </FormControlWrapper>
                           </Grid>

                           {/* Max loan Principal */}
                           <Grid item xs={4} pr={6}>
                              <FormControlWrapper
                                 name={productInfo.MAX_LOAN_PRINCIPAL}
                                 label="Maximum Loan Principal"
                                 required
                                 tooltipText={productInfo.toolTipText.maxLoanPrincipal}
                              >
                                 <FormControlBase
                                    name={productInfo.MAX_LOAN_PRINCIPAL}
                                    currency
                                    control="input"
                                    placeholder="1"
                                    extraLeft="NGN"
                                 />
                              </FormControlWrapper>
                           </Grid>
                        </Grid>

                        {/* Allow Multiple */}
                        <FormControlWrapper
                           name={productInfo.ALLOW_MULTIPLE}
                           label={
                              <Box>
                                 <Typography>Allow for Multiple</Typography>
                                 <Typography>Loan Requests</Typography>
                              </Box>
                           }
                           layout="horizontal"
                           tooltipText={productInfo.toolTipText.allowMultiple}
                        >
                           <FormControlBase
                              sx={{ ml: 7 }}
                              name={productInfo.ALLOW_MULTIPLE}
                              control="switch"
                           />
                        </FormControlWrapper>
                     </Box>

                     <Divider />
                     <Box display="flex" justifyContent="end" mt={5} mb={2}>
                        <Button variant="outlined">Save As Draft</Button>
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
      </FormContainer>
   );
};

export default ProductInfo;
