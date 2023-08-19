import CancelIcon from '@mui/icons-material/Cancel';
import { Box, IconButton, Typography } from '@mui/material';
import * as FormMeta from '@app/utils/validators/book-a-loan/charges-taxes-and-penalty-setup';
import React from 'react';
import AlertDialog from '@app/components/modal/AlertDialog';
import { AutocompleteWithCheckBoxControl } from '@app/components/forms/AutocompleteWithCheckboxControl';
import { Button } from '@app/components/atoms/Button';
import { ChargesAndTaxesI } from '@app/@types/book-a-loan';
import Dialog from '@app/components/atoms/Dialog';
import { ChargeModification } from '../charge-modification/ChargeModification';
import { RedBorderContentBox } from '@app/components/atoms/RedBorderBox';

export const EachSelectedEvent: React.FC<{
   name: string;
   event: ChargesAndTaxesI;
   handleRemoveItem: () => void;
}> = ({ event, name, handleRemoveItem }) => {
   const { InputFieldNames } = FormMeta;
   const [openDialog, setOpenDialog] = React.useState(false);
   const [openChargeModification, setOpenChargeModification] = React.useState(false);
   const [type, setType] = React.useState('dialog');
   const handleOpen = (type: string) => {
      setOpenDialog(true);
      setType(type);
   };

   const handleClose = () => setOpenDialog(false);
   return (
      <>
         <RedBorderContentBox>
            <Box display="flex" justifyContent="space-between" mb={1}>
               <Typography fontWeight="bold">{event.title}</Typography>
               <IconButton onClick={handleRemoveItem} sx={{ p: 0 }}>
                  <CancelIcon sx={{ color: 'primary.main' }} />
               </IconButton>
            </Box>
            <AutocompleteWithCheckBoxControl
               name={`${name}${InputFieldNames.CHARGES}`}
               label="Applicable Charges"
               options={charges}
               addButtonText="Create new charge"
               applyButtonText="Apply selected charge(s)"
               handleAddButton={() => handleOpen('charge')}
               handleApplyButton={() => {
                  // TODO:
               }}
               extras={
                  <Button
                     color="info"
                     variant="text"
                     sx={{ textDecoration: 'underline', px: 0, pl: 0.5, fontSize: 10 }}
                     onClick={(event) => {
                        event.stopPropagation();
                        setOpenChargeModification(true);
                     }}
                  >
                     [View/Modify]
                  </Button>
               }
            />
            <AutocompleteWithCheckBoxControl
               name={`${name}${InputFieldNames.TAXES}`}
               label="Applicable Taxes"
               options={charges}
               addButtonText="Create new tax"
               applyButtonText="Apply selected tax(es)"
               handleAddButton={() => handleOpen('tax')}
               handleApplyButton={() => {
                  // TODO:
               }}
            />
         </RedBorderContentBox>
         <AlertDialog
            open={openDialog}
            handleClose={handleClose}
            handleConfirm={handleClose}
            title="Do you want to suspend this process?"
            subtitle={`You will be redirected to the Charges management module to create the new ${type}`}
         />
         <Dialog
            minWidth="75%"
            open={openChargeModification}
            handleClose={() => setOpenChargeModification(false)}
            title="CHARGE MODIFICATION"
         >
            <ChargeModification />
         </Dialog>
      </>
   );
};
const charges = [
   { label: 'Account Reinstatement Fee' },
   { label: 'Collateral Liquidation Fee' },
   { label: 'Document Non-Compliance Fee' },
   { label: 'Disbursement Fee' },
   { label: 'Insufficient Funds Fee' },
   { label: 'Late Payment Fee' },
   { label: 'Loan Processing Fee' },
   { label: 'Loan Modification Fee' },
];
