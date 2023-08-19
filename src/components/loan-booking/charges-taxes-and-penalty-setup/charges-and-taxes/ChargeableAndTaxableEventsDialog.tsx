import * as FormMeta from '@app/utils/validators/book-a-loan/charges-taxes-and-penalty-setup';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import React from 'react';
import { Button } from '@app/components/atoms';
import Dialog from '@app/components/atoms/Dialog';
import { ChargesAndTaxesEvents } from './ChargesAndTaxesEvents';
import { SelectedChargesAndTaxesEvents } from './SelectedChargesAndTaxesEvents';
import { ChargesAndTaxesI } from '@app/@types/book-a-loan';
import { AddButton } from '@app/components/atoms/AddButton';
import AlertDialog from '@app/components/modal/AlertDialog';
interface ChargeableAndTaxableEventsProps {
   itemToggle: (searchValue: unknown, checkState?: boolean | undefined) => void;
   allItems: Array<ChargesAndTaxesI & { checked: boolean }>;
   newSelectedRef: React.MutableRefObject<string[]>;
   open: boolean;
   handleRemoveItem: (id: string) => void;
   checkedItems: ChargesAndTaxesI[];
   handleClose: () => void;
   handleSubmit: () => void;
}
export const ChargeableAndTaxableEventsDialog: React.FC<ChargeableAndTaxableEventsProps> = (props) => {
   const { errors } = useFormikContext<any>();
   const { InputFieldNames } = FormMeta;
   const [openAlertDialog, setOpenAlertDialog] = React.useState(false);
   const [type, setType] = React.useState('dialog');
   const handleOpenAlertDialog = (type: string) => {
      setOpenAlertDialog(true);
      setType(type);
   };

   const handleCloseAlertDialog = () => setOpenAlertDialog(false);
   return (
      <>
         <Dialog
            minWidth="75%"
            open={props.open}
            handleClose={props.handleClose}
            title="CHARGEABLE & TAXABLE EVENTS"
         >
            <Box sx={{ mb: 2 }}>
               <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography fontWeight="500">Events - Select one or more</Typography>
                  <Box>
                     <AddButton onClick={() => handleOpenAlertDialog('charge')} text="Create new charge" />
                     <AddButton onClick={() => handleOpenAlertDialog('tax')} text="Create new tax" />
                  </Box>
               </Box>
               <Divider sx={{ mt: 0.5 }} />
            </Box>
            <Grid container>
               <Grid item xs={4} pr={2}>
                  <ChargesAndTaxesEvents
                     newEvents={props.newSelectedRef}
                     allEvents={props.allItems}
                     itemToggle={props.itemToggle}
                  />
               </Grid>
               <Grid item xs={8}>
                  <SelectedChargesAndTaxesEvents
                     selectedEvents={props.checkedItems}
                     handleRemoveItem={(id) => props.handleRemoveItem(id)}
                  />
               </Grid>
            </Grid>
            {props.checkedItems.length > 0 && (
               <Box textAlign="center" mt={5} mb={2}>
                  <Button
                     color="primary"
                     onClick={props.handleSubmit}
                     disabled={Boolean(errors[InputFieldNames.CHARGES_AND_TAXES])}
                  >
                     Save & Apply
                  </Button>
               </Box>
            )}
         </Dialog>

         <AlertDialog
            open={openAlertDialog}
            handleClose={handleCloseAlertDialog}
            handleConfirm={handleCloseAlertDialog}
            title="Do you want to suspend this process?"
            subtitle={`You will be redirected to the Charges management module to create the new ${type}`}
         />
      </>
   );
};
