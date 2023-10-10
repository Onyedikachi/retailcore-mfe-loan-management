import { Form, Formik } from 'formik';
import { FormControlBase } from '../forms/FormControl';
import FormControlWrapper from '../forms/FormControlWrapper';
import { Box } from '@mui/material';
import { Button } from '../atoms/Button';
import * as FormMeta from '@app/utils/validators/customer-date-range';

export const CustomeDateRangeForm: React.FC<{ onSubmit: (values: FormMeta.FormValues) => void }> = ({
   onSubmit,
}) => {
   const { initialValues, validationSchema, Fields } = FormMeta;

   return (
      <Box p={2}>
         <Formik
            initialValues={initialValues}
            onSubmit={(values: FormMeta.FormValues) => onSubmit(values)}
            validationSchema={validationSchema}
         >
            {(formik) => {
               const isStartDateSelected = !!formik.values[Fields.START_DATE];

               return (
                  <Form>
                     <FormControlWrapper name={Fields.START_DATE} label="Start Date">
                        <FormControlBase control="date" name={Fields.START_DATE} />
                     </FormControlWrapper>
                     <FormControlWrapper name={Fields.END_DATE} label="End Date">
                        <FormControlBase
                           control="date"
                           name={Fields.END_DATE}
                           minDateString={formik.values[Fields.START_DATE]}
                           disabled={!isStartDateSelected}
                        />
                     </FormControlWrapper>
                     <Box textAlign={'center'} pt={2}>
                        <Button color="primary" type="submit">
                           Submit
                        </Button>
                     </Box>
                  </Form>
               );
            }}
         </Formik>
      </Box>
   );
};
