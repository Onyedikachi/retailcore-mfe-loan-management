import { Box, Divider, Grid, InputAdornment, Typography } from '@mui/material';
import FormContainer from '../../../form_container';
import { Button } from '@app/components/atoms';
import { FormControlBase } from '@app/components/forms/FormControl';
import FormControlWrapper from '@app/components/forms/FormControlWrapper';
import { Formik, Form } from 'formik';
import * as productInfo from '@app/utils/validators/personal_loan/product_info_validators';
import { Colors } from '@app/constants';
import ValueIncrementDecrement from '@app/components/value_increase_decrease';
import Accordion from '@app/components/accordion/Accordion';
import EarningsOrTurnover from './earnings-turnover';
type inputValue = { [key: string]: any };

const EligibilityCriteria: React.FC = () => {
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
                      <Accordion accordionLabels={[]}><EarningsOrTurnover formik={formik}/><></></Accordion>
                     </Box>
                  </Form>
               );
            }}
         </Formik>
      </FormContainer>
   );
};

export default EligibilityCriteria;
