import * as FormMeta from '@app/utils/validators/book-a-loan/charges-taxes-and-penalty-setup';
import { API_PATH } from '@app/constants';
import { useFormikCheckItems } from '@app/hooks/useFormikCheckItems';
import { useFormikHelper } from '@app/hooks/useFormikHelper';
import { Box } from '@mui/material';
import React, { useRef, useEffect } from 'react';
import { AddButton } from '@app/components/atoms/AddButton';
import { ChargesAndTaxesI } from '@app/@types/book-a-loan';
import { ChargeableAndTaxableEventsDialog } from './ChargeableAndTaxableEventsDialog';
import { Table } from '@app/components/atoms/Table';
import { BoxShadowEditIconButton, BoxShadowIconButton } from '@app/components/atoms';
import { Icon } from '@app/components/atoms/Icon';
import { Edit } from '@app/components/icons/Edit';

export const ChargesAndTaxesFields = () => {
   const [openDialog, setOpenDialog] = React.useState(false);
   const handleOpen = () => setOpenDialog(true);
   const { InputFieldNames } = FormMeta;
   const { arrayFieldsHelper } = useFormikHelper();

   const newSelectedRef = useRef<Array<string>>([]);

   const baseName = InputFieldNames.CHARGES_AND_TAXES;

   const { allItems, checkedItems, itemToggle } = useFormikCheckItems(
      // data?.data?.other_eligibility_reqs as Array<any>,
      result as Array<ChargesAndTaxesI>,
      [],
      'id',
      { fieldBaseName: baseName }
   );
   useEffect(() => {
      // getRequirements(API_PATH.OTHER_ELIGIBILTY_REQUIREMENT);
   }, []);

   const handleClose = (isCancel: boolean) => {
      if (isCancel) {
         newSelectedRef.current.map((id) => itemToggle(id));
         arrayFieldsHelper(baseName)?.removeAllByValue(newSelectedRef.current, 'id');
      }
      newSelectedRef.current = [];
      setOpenDialog(false);
   };
   const handleRemoveItem = (id: string) => {
      itemToggle(id);
      arrayFieldsHelper(baseName)?.removeAllByValue(id, 'id');
   };
   return (
      <>
         <Box sx={{ textAlign: 'end' }}>
            <AddButton onClick={handleOpen} text="Add charges and taxes" />
         </Box>
         <ChargeableAndTaxableEventsDialog
            open={openDialog}
            handleRemoveItem={handleRemoveItem}
            checkedItems={checkedItems}
            itemToggle={itemToggle}
            allItems={allItems}
            newSelectedRef={newSelectedRef}
            handleClose={() => handleClose(true)}
            handleSubmit={() => handleClose(false)}
         />
         <Box my={3}>
            <Table
               headerProps={chargeTableHeader}
               bodyProps={{
                  rows: [1, 2].map((item, id) => ({
                     chargeName: 'judidi',
                     charge: '2%',
                     impactedLedger: 'judidi',
                     event: '2%',
                     edit: (
                        <BoxShadowEditIconButton onClick={() => handleRemoveItem(id.toString())}>
                           <Edit sx={{ color: 'primary.main' }} />
                        </BoxShadowEditIconButton>
                     ),
                     cancel: (
                        <BoxShadowIconButton onClick={() => handleRemoveItem(id.toString())}>
                           <Icon type="close" color="primary" />
                        </BoxShadowIconButton>
                     ),
                  })),
               }}
            />
         </Box>
         <Box my={3}>
            <Table
               headerProps={taxTableHeader}
               bodyProps={{
                  rows: [1, 2].map((item, id) => ({
                     taxName: 'judidi',
                     commission: '2%',
                     impactedLedger: 'judidi',
                     event: '2%',
                     edit: (
                        <BoxShadowEditIconButton onClick={() => handleRemoveItem(id.toString())}>
                           <Edit sx={{ color: 'primary.main' }} />
                        </BoxShadowEditIconButton>
                     ),
                     cancel: (
                        <BoxShadowIconButton onClick={() => handleRemoveItem(id.toString())}>
                           <Icon type="close" color="primary" />
                        </BoxShadowIconButton>
                     ),
                  })),
               }}
            />
         </Box>
      </>
   );
};
//     display: flex;
//  align-items: baseline;
//  justify-content: flex-start;
const chargeableAndTaxableEvents = [
   'Auto Loan',
   'Debt Consolidation Loan',
   'Emergency Cash Loan',
   'Household Equipment Lease',
   'Auto Loan',
   'Debt Consolidation Loan',
   'Emergency Cash Loan',
   'Household Equipment Lease',
   'Auto Loan',
   'Debt Consolidation Loan',
   'Emergency Cash Loan',
   'Household Equipment Lease',
];
const result: ChargesAndTaxesI[] = Array.from(chargeableAndTaxableEvents).map((item, index) => ({
   id: index.toString(),
   title: item,
   taxes: [],
   charges: [],
}));
const chargeTableHeader = {
   data: [
      { key: 'sn', element: 'S/N' },
      { key: 'chargeName', element: 'CHARGE NAME' },
      { key: 'charge', element: 'CHARGE' },
      { key: 'impactedLedger', element: 'IMPACTED LEDGER' },
      { key: 'event', element: 'EVENT' },
      { key: 'edit' },
      { key: 'cancel' },
   ],
};
const taxTableHeader = {
   data: [
      { key: 'sn', element: 'S/N' },
      { key: 'taxName', element: 'TAX NAME' },
      { key: 'commission', element: 'COMMISION' },
      { key: 'impactedLedger', element: 'IMPACTED LEDGER' },
      { key: 'event', element: 'EVENT' },
      { key: 'edit' },
      { key: 'cancel' },
   ],
};
