import { FormikProps } from 'formik';
import { useCallback, useState } from 'react';

export const useFormikCheckItems = <T>(
   initialItems: Array<T>,
   itemKey?: keyof T,
   formikProps?: {
      formik: FormikProps<any>;
      fieldBaseName: string;
   }
) => {
   const [formikItems, setFormikItems] = useState(initialItems.map((item) => ({ ...item, checked: false })));
   const [checkedItems, setCheckedItems] = useState<Array<Omit<T, 'checked'>>>([]);

   const [key, setKey] = useState(itemKey);

   const itemToggle = useCallback(
      (searchValue: unknown, checkState?: boolean) => {
         if (!key) return;
         const _formikItems = [...formikItems];
         const foundItem = _formikItems.find((item) => item[key] === searchValue);
         if (foundItem) foundItem.checked = checkState ?? !foundItem.checked;

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
         const { values } = formikProps.formik;

         const isRemoval = checkedItems.length < values[formikProps.fieldBaseName].length;
         const isAddition = checkedItems.length > values[formikProps.fieldBaseName].length;

         if (isRemoval) removeItemsFromFormik(fieldName, result?.indexKey);
         if (isAddition) addItemsToFormik(fieldName, result);
      },
      [formikItems, formikProps, checkedItems]
   );

   const removeItemsFromFormik = (fieldName?: string, itemKey?: string) => {
      if (!formikProps?.formik) return;

      const {
         fieldBaseName,
         formik: { values: formikValues, setValues },
      } = formikProps;

      setValues({
         ...formikValues,
         [fieldBaseName]: formikValues[fieldBaseName].filter((formikValue: any) => {
            return checkedItems.some(
               (item) =>
                  (typeof item === 'object' ? (item as any)[itemKey ?? (key as string) ?? ''] : item) ===
                  (fieldName ? formikValue[fieldName] : formikValue)
            );
         }),
      });
   };

   const addItemsToFormik = (fieldName?: string, result?: { indexKey?: string; value?: unknown }) => {
      if (!formikProps?.formik) return;

      const {
         fieldBaseName,
         formik: { values: formikValues, setValues },
      } = formikProps;

      // Find item that is not in the formikValues
      const itemToAdd = checkedItems.find(
         (item) =>
            !formikValues[fieldBaseName].some(
               (formikValue: any) =>
                  (typeof item === 'object'
                     ? (item as any)[result?.indexKey ?? (key as string) ?? '']
                     : item) === (fieldName ? formikValue[fieldName] : formikValue)
            )
      );

      const addValue = result?.value ?? (itemToAdd as any)?.[result?.indexKey ?? ''];

      setValues({
         ...formikValues,
         [fieldBaseName]: [...formikValues[fieldBaseName], fieldName ? { [fieldName]: addValue } : addValue],
      });
   };

   return { formikItems, setKey, itemToggle, updateFormikState, checkedItems };
};
