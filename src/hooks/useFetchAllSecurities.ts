import { SecurityOptions } from '@app/@types/book-a-loan';
import { SecurityDocument } from '@app/@types/security-document';
import { API_PATH } from '@app/constants';
import { useState } from 'react';
import { useRequest } from 'react-http-query';

export const useFetchAllSecurities = () => {
   const [state, setState] = useState<Partial<Record<SecurityOptions, Array<SecurityDocument>>>>({});

   useRequest({
      onMount: (makeRequest) => makeRequest(API_PATH.SECURITY_ELIGIBILITY_DOCUMENT('collateral-assets')),
      memoryStorage: true,
      onSuccess: (reponse) =>
         setState((documents) => ({ ...documents, collateral: reponse.data?.security_document ?? [] })),
   });
   useRequest({
      onMount: (makeRequest) => makeRequest(API_PATH.SECURITY_ELIGIBILITY_DOCUMENT('guarantor')),
      memoryStorage: true,
      onSuccess: (reponse) =>
         setState((documents) => ({ ...documents, guarantor: reponse.data?.security_document ?? [] })),
   });
   useRequest({
      onMount: (makeRequest) => makeRequest(API_PATH.SECURITY_ELIGIBILITY_DOCUMENT('other-sec-requirements')),
      memoryStorage: true,
      onSuccess: (reponse) =>
         setState((documents) => ({ ...documents, other: reponse.data?.security_document ?? [] })),
   });

   return state;
};
