import { Box, Grid, Typography } from '@mui/material';
import * as FormMeta from '@app/utils/validators/book-a-loan/charge-modification';
import { Form, Formik } from 'formik';
import { Button } from '@app/components/atoms/Button';
import AccordionVariant2 from '@app/components/accordion/AccordionVariant2';
import { ChargeTypeFields } from './ChargeTypeFields';
import { TaxAndAccountingLedger } from './TaxAndAccountingLedgers';
import { ConditionsFields } from './CondtitionsFields';

export const ChargeModification = () => {
   const { initialValues, validator } = FormMeta;

   const onSubmit = (values: any) => {
      // TODO: Implement submit facility details field values to backend.
   };

   return (
      <Box sx={{ px: 4, py: 2 }} className="fancy-scrollbar">
         <Typography mb={2}>Charge Information</Typography>
         <Grid
            container
            sx={{ boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.25)', py: 3, px: 4, borderRadius: '8px' }}
         >
            {chargeDetails.map(({ key, value }, index) => (
               <Grid item xs={index == 1 ? 5 : 3.5} key={key}>
                  <Typography fontSize={12}>{key}</Typography>
                  <Typography fontSize={14}>{value}</Typography>
               </Grid>
            ))}
         </Grid>
         <Box>
            <Formik
               enableReinitialize={true}
               initialValues={initialValues}
               validationSchema={validator()}
               onSubmit={onSubmit}
            >
               {(formik) => {
                  return (
                     <Form>
                        <Box sx={{ py: 3 }}>
                           <AccordionVariant2 accordionLabels={FormMeta.accordionLabels}>
                              <ChargeTypeFields />
                              <TaxAndAccountingLedger />
                              <ConditionsFields />
                           </AccordionVariant2>
                        </Box>
                        <Box display="flex" alignItems="center" justifyContent="center" mt={5} mb={2}>
                           <Button
                              color="primary"
                              onClick={() => {}}
                              disabled={!formik.isValid}
                              type="submit"
                           >
                              Done
                           </Button>
                        </Box>
                     </Form>
                  );
               }}
            </Formik>
         </Box>
      </Box>
   );
};
const chargeDetails = [
   { key: 'Charge Name', value: 'Disbursement Fee' },
   { key: 'Description', value: 'This is a description for the charge' },
   { key: 'Currency', value: 'NGN' },
];
