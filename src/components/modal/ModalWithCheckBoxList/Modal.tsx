import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { ModalAddNewDialog } from './AddNewDialog';
import { Button, SearchInput } from '@app/components/atoms';
import { ListWithChildren, ListWithChildrenProps } from './ModalContent';
import { AddCircle } from '@mui/icons-material';
import { ModalWithCheckBoxItemChildren } from '@app/@types/security-document';
import Dialog from '@app/components/atoms/Dialog';
import { stringContains } from '@app/helper/compare';
import { objectDiff } from '@app/helper/object-diff';

interface ReusableModalProps {
   open: boolean;
   onClose: () => void;
   items: Array<ModalWithCheckBoxItemChildren>;
   onSubmit: (value: Array<ModalWithCheckBoxItemChildren>) => void;
   onCheckboxToggle?: (labelName: string) => void;
   headerText: string;
   addButtonText?: string;
   searchPlaceholder?: string;
   onAddNewValue?: (value: string) => void;
}

export const ModalWithCheckBoxList: React.FC<ReusableModalProps> = ({
   open,
   onClose,
   items,
   onSubmit,
   headerText,
   searchPlaceholder,
   addButtonText,
   onAddNewValue,
}) => {
   const [renderedItems, setRenderedItems] = useState([...items]);
   const [searchValue, setSearchValue] = useState('');
   const [allItems, setAllItems] = useState([...items]);
   const [showAddNew, setShowAddNew] = useState(false);

   const handleSearch = (searchBy: string) => {
      if (!searchBy) setRenderedItems([...allItems]);
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

   useEffect(() => {
      const { baseDiff, compareDiff, actionType } = objectDiff(items, allItems, 'labelName');
      if (actionType === 'add') {
         setAllItems((allItems) => [baseDiff[0], ...allItems]);
      } else if (actionType === 'remove') {
         setAllItems((allItems) =>
            allItems.filter(({ labelName }) => compareDiff[0]?.labelName !== labelName)
         );
      }
   }, [items]);

   useEffect(() => handleSearch(searchValue), [allItems]);

   const onCheckboxToggle = (labelName: string, childLabelName?: string) => {
      const _allItems = [...allItems];
      const item = _allItems.find((item) => item.labelName === labelName);

      if (childLabelName) {
         const childItem = item?.children?.find((child) => child.labelName === childLabelName);
         if (childItem) {
            childItem.checked = !childItem.checked;
         }
      } else if (item) item.checked = !item.checked;

      setAllItems(_allItems);
      handleSearch(searchValue);
   };

   const handleSubmit = () => {
      const selectedItems = allItems.reduce((prev, curr) => {
         if (curr.checked) {
            prev.push({ ...curr, children: curr?.children?.filter(({ checked }) => checked) });
         }
         return prev;
      }, [] as ListWithChildrenProps['items']);

      onSubmit(selectedItems);
   };

   return (
      <>
         <Dialog minWidth="430px" open={open} handleClose={onClose} title={headerText}>
            <Box>
               <SearchInput
                  handleSearch={handleSearch}
                  debounceTime={50}
                  placeholder={searchPlaceholder ?? 'Search words...'}
               />
               <Box mt={2} display="flex" justifyContent="flex-end">
                  <Button
                     onClick={() => setShowAddNew(true)}
                     color={'gray' as any}
                     startIcon={<AddCircle color="inherit" />}
                     variant="text"
                  >
                     {addButtonText ?? 'Add New'}
                  </Button>
               </Box>
               <ListWithChildren items={renderedItems} onCheckboxToggle={onCheckboxToggle} />
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
            </Box>
         </Dialog>
         <ModalAddNewDialog
            open={showAddNew}
            onClose={() => setShowAddNew(false)}
            onSubmit={(value) => onAddNewValue?.(value)}
         />
      </>
   );
};
