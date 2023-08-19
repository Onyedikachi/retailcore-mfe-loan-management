import * as FormMeta from '@app/utils/validators/book-a-loan/charges-taxes-and-penalty-setup';
import React from 'react';
import { Box } from '@mui/material';
import { Colors } from '@app/constants';
import { CheckboxItemOptions } from '@app/components/checkbox-item-options/ItemOptionsWrapper';
import { ChargesAndTaxesI } from '@app/@types/book-a-loan';
import { useFormikHelper } from '@app/hooks/useFormikHelper';

interface ChargesAndTaxesEventsProps {
   itemToggle: (searchValue: unknown, checkState?: boolean | undefined) => void;
   allEvents: Array<ChargesAndTaxesI & { checked: boolean }>;
   newEvents: React.MutableRefObject<string[]>;
}

export const ChargesAndTaxesEvents: React.FC<ChargesAndTaxesEventsProps> = ({
   itemToggle,
   allEvents,
   newEvents,
}) => {
   const { arrayFieldsHelper } = useFormikHelper();
   const formikArrayHelper = arrayFieldsHelper(FormMeta.InputFieldNames.CHARGES_AND_TAXES);

   return (
      <Box sx={{ border: `1px solid ${Colors.LightGray}`, p: 1, borderRadius: '5px' }}>
         <CheckboxItemOptions
            showSearchBox={false}
            items={
               allEvents.map(({ id, title, checked }) => ({
                  id,
                  labelName: title,
                  checked,
               })) ?? []
            }
            onCheckboxToggle={(item) => {
               itemToggle(item.id);
               if (item.checked) {
                  const checkedIndex = formikArrayHelper?.find(item.id, 'id');
                  formikArrayHelper?.removeAllAt(checkedIndex.index);
                  newEvents.current = newEvents.current?.filter((id) => id !== item.id);
               } else {
                  newEvents.current?.push(item.id);
               }
            }}
            showAddNewItemButton={false}
            showAddCloseButton={false}
            height="400px"
         />
      </Box>
   );
};
