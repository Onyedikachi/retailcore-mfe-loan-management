import { useFormikContext } from 'formik';
import { useCallback } from 'react';

export const useFormikHelper = () => {
   const { setFieldError, setFieldTouched, setFieldValue, getFieldProps } = useFormikContext();

   const resetFieldState = useCallback((fieldName: string, resetValue: unknown = '') => {
      setFieldValue(fieldName, resetValue);
      setFieldError(fieldName, '');
      setFieldTouched(fieldName, false, false);
   }, []);

   const arrayFieldsHelper = useCallback(
      (baseName: string) => ({
         removeAt: (index: number, key: string) => {
            // eslint-disable-next-line no-unused-vars
            const { [key]: _, ...resetValue } = getFieldProps(`${baseName}.${index}`).value;
            setFieldValue(`${baseName}.${index}`, resetValue);
         },
         removeAllAt: (index: number) =>
            setFieldValue(
               baseName,
               getFieldProps(`${baseName}`).value?.filter((_: unknown, pos: number) => index !== pos)
            ),
         removeAllByValue: (value: unknown | Array<unknown>, key?: string) => {
            const fieldValues = getFieldProps(`${baseName}`).value;

            setFieldValue(
               baseName,
               fieldValues?.filter((eachValue: any) => {
                  const compareValue = key ? eachValue[key] : eachValue;
                  if (Array.isArray(value)) return !value.includes(compareValue);
                  return value !== compareValue;
               })
            );
         },
         at: (index: number, key?: string) => {
            const fieldValue = getFieldProps(`${baseName}.${index}`).value;
            return key ? fieldValue?.[key] : fieldValue;
         },
         setValue: (index: number, value: unknown) => setFieldValue(`${baseName}.${index}`, value),
         setValueAt: (index: number, key: string, value: unknown) => {
            const arrayValues = getFieldProps(`${baseName}`).value ?? ([] as Array<any>);
            arrayValues[index] = { ...arrayValues[index], [key]: value };
            setFieldValue(`${baseName}`, arrayValues);
         },
         resetField: () => resetFieldState(baseName, []),
         find: (value: unknown, key?: string) => {
            const arrayValues = getFieldProps(`${baseName}`).value as Array<any>;
            const index = arrayValues?.findIndex(
               (fieldValue) => (key ? fieldValue[key] : fieldValue) === value
            );
            return { index, fieldValue: arrayValues[index] };
         },
         push: (value: unknown, key?: string) => {
            const arrayValues = getFieldProps(`${baseName}`).value as Array<any>;
            setFieldValue(baseName, [...arrayValues, ...(key ? [{ [key]: value }] : [value])]);
         },
      }),
      [setFieldValue, getFieldProps]
   );

   return { resetFieldState, arrayFieldsHelper };
};
