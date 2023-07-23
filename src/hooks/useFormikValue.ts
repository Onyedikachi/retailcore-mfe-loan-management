import { FormikProps } from 'formik';
import { useCallback } from 'react';

export const useFormikValue = <T>(formik: FormikProps<T>, baseName: string) => {
   const getFormikValue = useCallback(
      (fieldName: string) => {
         return formik.getFieldProps(`${baseName}${fieldName}`)?.value;
      },
      [baseName, formik]
   );

   return getFormikValue;
};
