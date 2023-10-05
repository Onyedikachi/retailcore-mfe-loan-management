import { Form, Formik } from 'formik';
import { FormControlBase } from '../forms/FormControl';
import FormControlWrapper from '../forms/FormControlWrapper';
import { Box } from '@mui/material';
import { Button } from '../atoms/Button';

const Fields = { STARTDATE: 'startDate', ENDDATE: 'endDate' } as const;

const initialValues = { [Fields.STARTDATE]: '', [Fields.ENDDATE]: '' };
type FormValues = typeof initialValues;

export const CustomeDateRangeForm: React.FC<{ onSubmit: (values: FormValues) => void }> = ({ onSubmit }) => {
   return (
      <Box p={2}>
         <Formik initialValues={initialValues} onSubmit={(values: FormValues) => onSubmit(values)}>
            {(formik) => {
               const isStartDateSelected = !!formik.values[Fields.STARTDATE];

               return (
                  <Form>
                     <FormControlWrapper name={Fields.STARTDATE} label="Start Date">
                        <FormControlBase control="date" name={Fields.STARTDATE} />
                     </FormControlWrapper>
                     <FormControlWrapper name={Fields.ENDDATE} label="End Date">
                        <FormControlBase
                           control="date"
                           name={Fields.ENDDATE}
                           minDateString={formik.values[Fields.STARTDATE]}
                           disabled={!isStartDateSelected}
                        />
                     </FormControlWrapper>
                     <Box textAlign={'center'} pt={2}>
                        <Button
                           color="primary"
                           type="submit"
                           disabled={Object.entries(formik.errors).length !== 0 || !formik.isValid}
                        >
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
