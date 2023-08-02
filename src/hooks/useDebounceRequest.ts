import { useRequest } from 'react-http-query';
import { useCallback, useEffect, useRef, useState } from 'react';

export const useDebounceRequests = (urlPath?: string, debounceTime = 3000) => {
   const [requestBody, setRequestBody] = useState<unknown>();
   const [requestPath, setRequestPath] = useState(urlPath);
   const timeout = useRef<NodeJS.Timeout | null>(null);

   const [{ data: response }, makeDebounceRequest] = useRequest();

   const requestCallback = useCallback(() => {
      timeout.current && clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
         if (requestPath) {
            makeDebounceRequest(requestPath as string, { body: requestBody as any });
         }
      }, debounceTime);
   }, [debounceTime, requestPath, requestBody]);

   useEffect(() => {
      requestCallback();
   }, [requestCallback]);

   useEffect(() => {
      if (urlPath) setRequestPath(urlPath);
   }, []);

   return { setRequestBody, setRequestPath, response };
};
