import React from 'react';
import { Box, Typography } from '@mui/material';
import Checkbox from '../../atoms/Checkbox';
import { ModalWithCheckBoxItemChildren } from '@app/@types/security-document';
import { Colors } from '@app/constants';

export interface ListWithChildrenProps {
   items: Array<ModalWithCheckBoxItemChildren>;
   onCheckboxToggle: (labelName: string, childLabelName?: string) => void;
}

export const ListWithChildren: React.FC<ListWithChildrenProps> = ({ items, onCheckboxToggle }) => {
   const renderListItem = (item: ModalWithCheckBoxItemChildren, childLabelId?: string) => {
      return (
         <Box sx={{ display: 'flex', alignItems: 'center', ...(childLabelId && { ml: 2 }) }}>
            <Checkbox checked={item.checked} onChange={() => onCheckboxToggle(item.id, childLabelId)} />
            <Typography>{item.labelName}</Typography>
            {item.status === 'Added' && (
               <Typography marginLeft={0.7} variant="caption" color={Colors.Info}>
                  [Added]
               </Typography>
            )}
         </Box>
      );
   };

   return (
      <Box sx={{ maxHeight: '20vh', overflowY: 'auto', margin: '5% 0%' }}>
         {items.map((item) => (
            <Box key={item.id}>
               {renderListItem(item)}
               {item.children && item.children.map((childItems) => renderListItem(childItems, childItems.id))}
            </Box>
         ))}
      </Box>
   );
};
