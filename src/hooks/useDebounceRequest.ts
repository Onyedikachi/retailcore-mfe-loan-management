import { useRequest } from 'react-http-query';
import useDebounce from './useDebounce';
import { useEffect, useState } from 'react';

export const useDebounceRequests = (urlPath?: string, debounceTime = 3000) => {
   const { debouncedValue: requestBody, setDebouncedValue: setRequestBody } = useDebounce(debounceTime);
   const { debouncedValue: requestPath = urlPath, setDebouncedValue: setRequestPath } =
      useDebounce(debounceTime);

   const [response, setResponse] = useState<any>();
   const [, makeDebounceRequest] = useRequest({
      onSuccess: (successResponse) => setResponse(successResponse),
      onError: (errorResponse) => setResponse(errorResponse),
   });

   useEffect(() => {
      if (requestPath) {
         makeDebounceRequest(requestPath as string, { body: requestBody as any });
      }
   }, [requestPath, requestBody]);

   return { setRequestBody, setRequestPath, response };
};
