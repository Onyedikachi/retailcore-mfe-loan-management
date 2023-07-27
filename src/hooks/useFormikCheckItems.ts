import { FormikProps } from 'formik';
import { useCallback, useState } from 'react';

export const useFormikCheckItems = <T>(
   initialItems: Array<T>,
   defaultSelectedItems: Array<T>,
   itemKey?: keyof T,
   formikProps?: {
      formik: FormikProps<any>;
      fieldBaseName: string;
   }
) => {
   const [formikItems, setFormikItems] = useState(initialItems.map((item) => ({ ...item, checked: false })));
   const [checkedItems, setCheckedItems] = useState<Array<Omit<T, 'checked'>>>(defaultSelectedItems ?? []);
   const [updateItem, setUpdateItem] = useState<T & { checked?: boolean }>();

   const [key, setKey] = useState(itemKey);

   const itemToggle = useCallback(
      (searchValue: unknown, checkState?: boolean) => {
         if (!key) return;
         const _formikItems = [...formikItems];
         const foundItem = _formikItems.find((item) => item[key] === searchValue);
         if (foundItem) foundItem.checked = checkState ?? !foundItem.checked;

         setUpdateItem({ ...(foundItem as any) });
         setCheckedItems(
            _formikItems
               .filter(({ checked }) => checked)
               // eslint-disable-next-line no-unused-vars
               .map(({ checked, ...restProps }) => ({ ...restProps }))
         );
         setFormikItems(_formikItems);
      },
      [formikItems, key]
   );

   const updateFormikState = useCallback(
      (fieldName?: string, result?: { indexKey?: string; value?: unknown }) => {
         if (!formikProps?.formik) return;
         const {
            formik: { values, setFieldValue },
            fieldBaseName,
         } = formikProps;

         if (updateItem) {
            const newValue = result?.indexKey ? (updateItem as any)[result.indexKey] : result?.value;
            if (updateItem.checked) {
               setFieldValue(fieldBaseName, [
                  ...values[fieldBaseName],
                  fieldName ? { [fieldName]: newValue } : newValue,
               ]);
            } else {
               setFieldValue(
                  fieldBaseName,
                  (values[fieldBaseName] ?? []).filter(
                     (value: any) => (fieldName ? value[fieldName] : value) !== newValue
                  )
               );
            }
         }
      },
      [formikItems, formikProps, checkedItems, updateItem]
   );

   const clearCheckedItems = () => {
      setCheckedItems([]);
      if (formikProps?.formik) {
         formikProps.formik.setFieldValue(formikProps.fieldBaseName, []);
      }
   };

   return { formikItems, setKey, itemToggle, updateFormikState, checkedItems, clearCheckedItems };
};
