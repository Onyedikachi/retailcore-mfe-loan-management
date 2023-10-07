import { Form, Formik } from 'formik';
import { FormControlBase } from '../forms/FormControl';
import FormControlWrapper from '../forms/FormControlWrapper';
import { Box } from '@mui/material';
import { Button } from '../atoms/Button';
import * as Yup from 'yup';

const Fields = { STARTDATE: 'startDate', ENDDATE: 'endDate' } as const;

const initialValues = { [Fields.STARTDATE]: '', [Fields.ENDDATE]: '' };

const validationSchema = Yup.object().shape({
   startDate: Yup.string().required('Start Date is required'),
   endDate: Yup.string().required('End Date is required'),
});

type FormValues = typeof initialValues;

export const CustomeDateRangeForm: React.FC<{ onSubmit: (values: FormValues) => void }> = ({ onSubmit }) => {
   return (
      <Box p={2}>
         <Formik
            initialValues={initialValues}
            onSubmit={(values: FormValues) => onSubmit(values)}
            validationSchema={validationSchema}
         >
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
