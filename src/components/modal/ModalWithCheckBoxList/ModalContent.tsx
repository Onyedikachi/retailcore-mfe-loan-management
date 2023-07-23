import React from 'react';
import { Box, Typography } from '@mui/material';

import Checkbox from '../../atoms/Checkbox';
import { ModalWithCheckBoxItemChildren } from '@app/@types/security-document';

export interface ListWithChildrenProps {
   items: Array<ModalWithCheckBoxItemChildren>;
   onCheckboxToggle: (labelName: string, childLabelName?: string) => void;
}

export const ListWithChildren: React.FC<ListWithChildrenProps> = ({ items, onCheckboxToggle }) => {
   const renderListItem = (label: string, checked: boolean, isChild?: boolean, childLabel?: string) => {
      return (
         <Box sx={{ display: 'flex', alignItems: 'center', ...(isChild && { ml: 2 }) }}>
            <Checkbox checked={checked} onChange={() => onCheckboxToggle(label, childLabel)} />
            <Typography>{label}</Typography>
         </Box>
      );
   };

   return (
      <Box sx={{ maxHeight: '20vh', overflowY: 'auto', margin: '5% 0%' }}>
         {items.map((item) => (
            <Box key={item.labelName}>
               {renderListItem(item.labelName, item.checked)}
               {item.children &&
                  item.children.map((childItems) =>
                     renderListItem(childItems.labelName, childItems.checked, true, item.labelName)
                  )}
            </Box>
         ))}
      </Box>
   );
};
