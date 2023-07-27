import { FormikProps } from 'formik';
import { useCallback } from 'react';

export const useFormikHelper = (formik: FormikProps<any>) => {
   const resetFieldState = useCallback(
      (fieldName: string, resetValue: unknown = '') => {
         formik.setFieldValue(fieldName, resetValue);
         formik.setFieldError(fieldName, '');
         formik.setFieldTouched(fieldName, false, false);
      },
      [formik]
   );

   return { resetFieldState };
};
