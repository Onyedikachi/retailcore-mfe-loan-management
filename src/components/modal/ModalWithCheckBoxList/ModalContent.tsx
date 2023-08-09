import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import Checkbox from '../../atoms/Checkbox';
import { ModalWithCheckBoxItemChildren } from '@app/@types/security-document';
import { Colors } from '@app/constants';
import CancelIcon from '@mui/icons-material/Cancel';
export interface ListWithChildrenProps {
   items: Array<ModalWithCheckBoxItemChildren>;
   onCheckboxToggle: (labelName: string, childLabelName?: string) => void;
   onRemoveItem?: (id: string, labelName: string) => void;
}

export const ListWithChildren: React.FC<ListWithChildrenProps> = ({
   items,
   onCheckboxToggle,
   onRemoveItem,
}) => {
   const renderListItem = (item: ModalWithCheckBoxItemChildren, childLabelId?: string) => {
      return (
         <Box
            sx={{
               display: 'flex',
               width: '100%',
               justifyContent: 'space-between',
               alignItems: 'center',
               ...(childLabelId && { ml: 2 }),
            }}
         >
            <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', flex: 1 }}>
               <Checkbox checked={item.checked} onChange={() => onCheckboxToggle(item.id, childLabelId)} />
               <Typography>{item.labelName}</Typography>
               {item.status === 'Added' && (
                  <Typography marginLeft={0.7} variant="caption" color={Colors.Info}>
                     [Added]
                  </Typography>
               )}
            </Box>
            {item.status === 'Added' && (
               <IconButton onClick={() => onRemoveItem?.(item.id, item.labelName)} color="error">
                  <CancelIcon />
               </IconButton>
            )}
         </Box>
      );
   };

   return (
      <Box className="fancy-scrollbar" sx={{ maxHeight: '20vh', overflowY: 'auto', margin: '5% 0%' }}>
         {items.map((item) => (
            <Box key={item.id}>
               {renderListItem(item)}
               {item.children && item.children.map((childItems) => renderListItem(childItems, childItems.id))}
            </Box>
         ))}
      </Box>
   );
};
