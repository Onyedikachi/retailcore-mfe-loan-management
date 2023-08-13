import { useCallback } from 'react';
import { useCheckItems } from './useCheckItems';
import { useFormikHelper } from './useFormikHelper';

export const useFormikCheckItems = <T>(
   initialItems: Array<T>,
   defaultSelectedItems: Array<T>,
   itemKey?: keyof T,
   formikProps?: {
      fieldBaseName: string;
   }
) => {
   const {
      itemToggle,
      checkedItems,
      updateItem,
      setKey,
      clearCheckedItems: clearItems,
      allItems,
   } = useCheckItems(initialItems, defaultSelectedItems, itemKey);

   const { arrayFieldsHelper } = useFormikHelper();

   const updateFormikState = useCallback(
      (fieldName?: string, result?: { indexKey?: string; value?: unknown }) => {
         if (!formikProps?.fieldBaseName) return;
         const arrayHelper = arrayFieldsHelper(formikProps.fieldBaseName);

         if (updateItem) {
            const newValue = result?.indexKey ? (updateItem as any)[result.indexKey] : result?.value;

            if (updateItem.checked) {
               // const checkItemIndex = checkedItems.findIndex(({ id }) => updateItem.)
               arrayHelper.push(newValue, fieldName);
            } else {
               const { index } = arrayHelper.find(newValue, fieldName);
               arrayHelper.removeAllAt(index);
            }
         }
      },
      [formikProps, checkedItems, updateItem]
   );

   const clearCheckedItems = (fieldName: string) => {
      clearItems();
      arrayFieldsHelper(fieldName).resetField();
   };

   return { allItems, setKey, itemToggle, updateFormikState, checkedItems, clearCheckedItems };
};
