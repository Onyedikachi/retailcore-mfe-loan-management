import { useCallback, useEffect, useState } from 'react';
import { useFetchAllSecurities } from './useFetchAllSecurities';
import { ModalWithCheckBoxItemChildren, SecurityDocument } from '@app/@types/security-document';
import { SecurityOptions } from '@app/@types/create-credit-product';
import { useRequest } from 'react-http-query';
import { API_PATH } from '@app/constants';
import { EligibilitySecurity } from '@app/constants/eligibility-security';
import { FormikProps } from 'formik';

interface CheckSecurityDocument extends SecurityDocument {
   checked: boolean;
}

export const useSecurityAction = <T>(formik: FormikProps<T>) => {
   const [createdSecurityType, setCreatedSecurityType] = useState<SecurityOptions>();

   const [securityDocuments, setSecurityDocuments] = useState<
      Record<SecurityOptions, Array<CheckSecurityDocument>>
   >({ collateral: [], guarantor: [], other: [] });

   const apiSecurityDocuments = useFetchAllSecurities();
   const [, addNewSecurityDocument] = useRequest({
      onSuccess: (response) => {
         if (createdSecurityType) {
            setSecurityDocuments((documents) => ({
               ...documents,
               [createdSecurityType]: [
                  { checked: false, ...response.data?.security_document },
                  ...documents[createdSecurityType],
               ],
            }));
         }
      },
   });

   useEffect(() => {
      setSecurityDocuments({
         collateral:
            apiSecurityDocuments?.collateral?.map((item: SecurityDocument) => ({
               ...item,
               checked: false,
            })) ?? [],
         guarantor:
            apiSecurityDocuments?.guarantor?.map((item: SecurityDocument) => ({
               ...item,
               checked: false,
            })) ?? [],
         other:
            apiSecurityDocuments?.other?.map((item: SecurityDocument) => ({ ...item, checked: false })) ?? [],
      });
   }, [apiSecurityDocuments]);

   const updateCheckedItems = useCallback(
      (securityOption: SecurityOptions, checkedItems: Array<ModalWithCheckBoxItemChildren>) => {
         let items = securityDocuments[securityOption];

         items = items.map((item) => ({
            ...item,
            checked: !!checkedItems.find(({ labelName }) => labelName === item.name),
         }));
         const documents = { ...securityDocuments, [securityOption]: items };
         documents[securityOption]
            .filter(({ checked }) => checked)
            .forEach(({ id }, index) => {
               formik.setFieldValue(`${EligibilitySecurity[securityOption].formFieldName}.${index}.id`, id);
               if (securityOption === 'collateral') {
                  formik.setFieldValue(
                     `${EligibilitySecurity[securityOption].formFieldName}.${index}.unit`,
                     'percent'
                  );
               }
            });

         setSecurityDocuments(documents);
      },
      [securityDocuments]
   );

   const removeCheckItem = useCallback(
      (securityOption: SecurityOptions, id: string) => {
         const items = securityDocuments[securityOption];
         const item = items.find((item) => item.id === id);
         if (item) item.checked = false;

         setSecurityDocuments((documents) => ({ ...documents, [securityOption]: items }));
      },
      [securityDocuments, formik]
   );

   const addNewSecurityValue = (securityOption: SecurityOptions, value: string) => {
      setCreatedSecurityType(securityOption);
      addNewSecurityDocument(API_PATH.SECURITY_ELIGIBILITY_DOCUMENT(), {
         body: { type: EligibilitySecurity[securityOption].endpointKey, name: value },
      });
   };

   return { removeCheckItem, updateCheckedItems, securityDocuments, addNewSecurityValue };
};
