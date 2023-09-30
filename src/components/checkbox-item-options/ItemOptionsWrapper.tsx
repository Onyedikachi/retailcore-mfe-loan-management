import React, { useEffect, useState } from 'react';
import { Box, Stack, StackProps } from '@mui/material';
import { ModalAddNewDialog } from '../modal/AddNewDialog';
import { Button, SearchInput } from '@app/components/atoms';
import { ListWithChildren, ListWithChildrenProps } from './ItemOptionsDisplay';
import { AddCircle } from '@mui/icons-material';
import { stringContains } from '@app/helper/string';
import { CheckboxOptionsItem, CheckboxOptionsItemChildren } from '@app/@types/security-document';
import { useCheckItems } from '@app/hooks/useCheckItems';

interface CheckboxItemOptionsProps extends Omit<StackProps, 'onSubmit'> {
   items: Array<CheckboxOptionsItemChildren>;
   onSubmit?: (value: Array<CheckboxOptionsItemChildren>) => void;
   /** Passing this, implies updating check items won't be handled by this component */
   onCheckboxToggle?: (item: CheckboxOptionsItem, checkedItems: Array<CheckboxOptionsItemChildren>) => void;
   addButtonText?: string;
   searchPlaceholder?: string;
   onAddNewValue?: (value: string) => void;
   onRemoveItem?: (id: string, labelName: string) => void;
   showSearchBox?: boolean;
   showAddNewItemButton?: boolean;
   showAddCloseButton?: boolean;
}

export const CheckboxItemOptions: React.FC<CheckboxItemOptionsProps> = ({
   items,
   onSubmit,
   searchPlaceholder,
   addButtonText,
   onAddNewValue,
   onRemoveItem,
   showSearchBox = true,
   showAddNewItemButton = true,
   showAddCloseButton = true,
   onCheckboxToggle,
   ...otherProps
}) => {
   const { allItems: internalAllItems, itemToggle } = useCheckItems(
      items,
      items?.filter(({ checked }) => checked),
      'id'
   );

   const isSelfHandled = !!onCheckboxToggle;
   const allItems = isSelfHandled ? items : internalAllItems;

   const [renderedItems, setRenderedItems] = useState(allItems);
   const [searchValue, setSearchValue] = useState('');
   const [showAddNew, setShowAddNew] = useState(false);

   const handleSearch = (searchBy: string) => {
      if (!searchBy) setRenderedItems(allItems);
      else {
         const searchedItems = allItems.filter(
            ({ labelName, children }) =>
               stringContains(labelName, searchBy) ||
               children?.some(({ labelName }) => stringContains(labelName, searchBy))
         );
         setRenderedItems(searchedItems);
      }
      setSearchValue(searchBy);
   };

   useEffect(() => handleSearch(searchValue), [allItems]);

   const handleCheckboxToggle = (id: string, childLabelId?: string) => {
      const item = allItems.find((item) => item.id === id);
      if (item && isSelfHandled) return onCheckboxToggle?.(item, allItems);

      if (childLabelId) {
         const childItem = item?.children?.find((child) => child.id === childLabelId);
         if (childItem) {
            childItem.checked = !childItem.checked;
         }
      } else if (item) itemToggle(item.id);

      handleSearch(searchValue);
   };

   const handleSubmit = () => {
      const selectedItems = allItems.reduce((prev, curr) => {
         if (curr.checked) {
            prev.push({ ...curr, children: curr?.children?.filter(({ checked }) => checked) });
         }
         return prev;
      }, [] as ListWithChildrenProps['items']);

      onSubmit?.(selectedItems);
   };

   return (
      <>
         <Stack {...otherProps}>
            {showSearchBox && (
               <SearchInput
                  handleSearch={handleSearch}
                  debounceTime={50}
                  placeholder={searchPlaceholder ?? 'Search words...'}
                  boxProps={{ paddingX: 1 }}
               />
            )}
            {showAddNewItemButton && (
               <Box mt={2} display="flex" justifyContent="flex-end">
                  <Button
                     onClick={() => setShowAddNew(true)}
                     color="gray"
                     startIcon={<AddCircle color="inherit" />}
                     variant="text"
                  >
                     {addButtonText ?? 'Add New'}
                  </Button>
               </Box>
            )}
            <ListWithChildren
               onRemoveItem={onRemoveItem}
               items={renderedItems}
               onCheckboxToggle={handleCheckboxToggle}
            />
            {showAddCloseButton && (
               <Box mt={2} display="flex" justifyContent="center">
                  <Button
                     disabled={allItems.every((item) => !item.checked)}
                     color="primary"
                     variant="contained"
                     onClick={handleSubmit}
                  >
                     Add
                  </Button>
               </Box>
            )}
         </Stack>
         <ModalAddNewDialog
            open={showAddNew}
            onClose={() => setShowAddNew(false)}
            onSubmit={(value) => onAddNewValue?.(value)}
         />
      </>
   );
};
