import { FormControlBase } from '@app/components/forms/FormControl';
import FormControlWrapper from '@app/components/forms/FormControlWrapper';
import { Box } from '@mui/system';
import { Formik, Form } from 'formik';
import * as FormMeta from '@app/utils/validators/loan-management/loan-rejection';
import { TextAreaControl } from '@app/components/forms/TextAreaControl';
import { Button } from '@app/components/atoms/Button';
import { Grid, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Colors } from '@app/constants/colors';

export const LoanRejection: React.FC<{ handleSubmit?: () => void }> = ({ handleSubmit }) => {
   const { initialValues, validationSchema, Fields } = FormMeta;

   const onSubmit = (values: FormMeta.FormValues) => {
      handleSubmit?.();
   };

   return (
      <Box p={2}>
         <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {(formik) => {
               return (
                  <Form>
                     <Grid container>
                        <Grid item xs={6}>
                           <FormControlWrapper name={Fields.ROUTE_TO} label={'Route request to'}>
                              <FormControlBase
                                 control="autocomplete"
                                 name={Fields.ROUTE_TO}
                                 options={['Shannon Pierce', 'Loius Boss']}
                                 placeholder="Type to search"
                                 noOptionsText="No match"
                                 search
                              />
                           </FormControlWrapper>
                        </Grid>
                        <Grid item xs={6} pl={4} display="flex" alignItems="center">
                           <InfoIcon sx={{ color: Colors.Primary, mr: 1 }} />
                           <Typography>User is currently unavailable, please reroute</Typography>
                        </Grid>
                     </Grid>

                     <TextAreaControl
                        name={Fields.REASON}
                        rows={6}
                        required
                        label={`Provide reason for rejection`}
                        placeholder="Reason"
                     />

                     <Box textAlign={'center'} pt={3}>
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
