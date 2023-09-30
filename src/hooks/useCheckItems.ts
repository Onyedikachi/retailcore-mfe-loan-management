import { useCallback, useMemo, useRef, useState } from 'react';

export const useCheckItems = <T>(
   initialItems: Array<T>,
   defaultSelectedItems: Array<T>,
   itemKey?: keyof T
) => {
   const key = useRef(itemKey);
   const [checkedItems, setCheckedItems] = useState<Array<Omit<T, 'checked'>>>(defaultSelectedItems ?? []);
   const [updateItem, setUpdateItem] = useState<T & { checked?: boolean }>();

   const items = useMemo(() => {
      const checkedKeys = checkedItems.map(({ [itemKey ?? 'id']: keyValue }) => keyValue as unknown);
      return (initialItems ?? []).map((item) => ({
         ...item,
         checked: checkedKeys.includes((item as any)[itemKey ?? 'id']),
      }));
   }, [initialItems, checkedItems]);

   const itemToggle = useCallback(
      (searchValue: unknown, checkState?: boolean) => {
         if (!key.current) return;

         const _formikItems = [...items];
         const foundItem = _formikItems.find((item) => item[key.current!] === searchValue);
         if (foundItem) foundItem.checked = checkState ?? !foundItem.checked;

         setUpdateItem({ ...(foundItem as any) });

         setCheckedItems(
            _formikItems
               .filter(({ checked }) => checked)
               // eslint-disable-next-line no-unused-vars
               .map(({ checked, ...restProps }) => ({ ...restProps }))
         );
      },
      [items, key]
   );

   const clearCheckedItems = () => {
      setCheckedItems([]);
   };

   const setKey = (newKey: keyof T) => (key.current = newKey);

   return { allItems: items, itemToggle, checkedItems, updateItem, setKey, clearCheckedItems };
};
