import * as FormMeta from '@app/utils/validators/book-a-loan/charges-taxes-and-penalty-setup';
import React from 'react';
import { Box, List } from '@mui/material';
import { Colors } from '@app/constants';
import { FieldArray } from 'formik';
import { ChargesAndTaxesI } from '@app/@types/book-a-loan';
import { EachSelectedEvent } from './EachSelectedEvent';
interface SelectedChargesAndTaxesEventsProps {
   selectedEvents: Array<ChargesAndTaxesI>;
   handleRemoveItem: (id: string) => void;
}
export const SelectedChargesAndTaxesEvents: React.FC<SelectedChargesAndTaxesEventsProps> = ({
   selectedEvents,
   handleRemoveItem,
}) => {
   const { InputFieldNames } = FormMeta;
   return (
      <>
         <Box sx={{ border: `1px solid ${Colors.LightGray}`, borderRadius: '5px', p: 1, minHeight: '100%' }}>
            <Box sx={{ maxHeight: '400px', overflow: 'auto' }}>
               <List className="fancy-scrollbar" sx={{ p: 1 }}>
                  <FieldArray
                     render={() =>
                        selectedEvents.map((event, index) => (
                           <EachSelectedEvent
                              name={`${InputFieldNames.CHARGES_AND_TAXES}.${index}.`}
                              key={event.id}
                              event={event}
                              handleRemoveItem={() => handleRemoveItem(event.id)}
                           />
                        ))
                     }
                     name={InputFieldNames.CHARGES_AND_TAXES}
                  />
               </List>
            </Box>
         </Box>
      </>
   );
};
