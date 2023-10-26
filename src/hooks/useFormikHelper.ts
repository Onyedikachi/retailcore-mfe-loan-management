import { FieldConfig, FieldInputProps, FormikErrors, useFormikContext } from 'formik';
import { useCallback } from 'react';

type GetFieldProps = <Value = any>(props: string | FieldConfig<Value>) => FieldInputProps<Value>;
type SetFieldValue = (
   field: string,
   value: any,
   shouldValidate?: boolean | undefined
) => Promise<void | FormikErrors<unknown>>;

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
         removeAllByValue: removeAllByValue(getFieldProps, setFieldValue, baseName),
         /**
          * The purpose of this updateField is to check the passed values and check for new items
          * that doesn't exist in the formik array field and update the formik array field items
          * with the new items.
          *
          * @param value Either an array of object or an object, the functions checks if the value contains/is
          * a new item.
          * @param formikKey The key of the object items in formik that would be use to compare.
          * If not supplied, it assume the array field contains primitive values.
          * @param valueKey The key of the object items in the value argument to be used to compare. If not
          * supplied and formikKey is supplied, it assumed the valueKey is same as the formikKey.
          */
         updateField: updateField(getFieldProps, setFieldValue, baseName),
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
               (fieldValue) => (key ? fieldValue?.[key] : fieldValue) === value
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

const removeAllByValue =
   (getFieldProps: GetFieldProps, setFieldValue: SetFieldValue, baseName: string) =>
   (value: any, key?: string) => {
      const fieldValues = getFieldProps(`${baseName}`).value;

      setFieldValue(
         baseName,
         fieldValues?.filter((eachValue: any) => {
            const compareValue = key ? eachValue[key] : eachValue;
            if (Array.isArray(value)) return !value.includes(compareValue);
            return value !== compareValue;
         })
      );
   };

const updateField =
   (getFieldProps: GetFieldProps, setFieldValue: SetFieldValue, baseName: string) =>
   (value: any, formikKey?: string, valueKey?: string) => {
      let fieldValues = getFieldProps(`${baseName}`).value ?? [];
      const values = Array.isArray(value) ? value : [value];
      const _formikKey = formikKey ?? Symbol();
      const _valueKey = valueKey ?? _formikKey;

      values.forEach((_value) => {
         if (
            !fieldValues.find(
               (fieldValue: any) =>
                  (fieldValue?.[_formikKey] ?? fieldValue) === (_value?.[_valueKey] ?? _value)
            )
         ) {
            fieldValues.push(_value);
         }
      });

      fieldValues.forEach((fieldValue: any) => {
         if (
            !values.find(
               (_value: any) => (fieldValue?.[_formikKey] ?? fieldValue) === (_value?.[_valueKey] ?? _value)
            )
         ) {
            fieldValues = fieldValues.filter(
               (_value: any) => (_value?.[_formikKey] ?? _value) !== (fieldValue?.[_formikKey] ?? fieldValue)
            );
         }
      });

      setFieldValue(`${baseName}`, fieldValues);
   };
