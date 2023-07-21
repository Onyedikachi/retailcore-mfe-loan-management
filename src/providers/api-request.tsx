import { AlertSnackbar } from '@app/components';
import { Loader } from '@app/components/Loader';
import { API_PATH } from '@app/constants';
import { useState } from 'react';
import { RequestProvider } from 'react-http-query';

interface APIRequestProviderProps {
   children: React.ReactNode;
}

// Add routes that you want not to show loader when API is being called here;
const LOADING_IGNORED_ROUTE = [API_PATH.PRODUCT_NAME_AVAILABILITY('')];

// Add routes that you want error messages display to be ignored here.
const ERROR_DISPLAYED_IGNORED_ROUTE = [API_PATH.PRODUCT_NAME_AVAILABILITY('')];

export const APIRequestProvider = ({ children }: APIRequestProviderProps) => {
   const baseUrl = process.env.API_URL ?? '';
   const [requestUrl, setRequestUrl] = useState('');

   return (
      <RequestProvider
         interceptors={{
            request(payload) {
               setRequestUrl(payload.url);
               const authorizationToken = localStorage.getItem('@sterling_core_token');
               return {
                  ...payload,
                  headers: {
                     Authorization: `Bearer ${authorizationToken}`,
                     'Content-Type': 'application/json',
                  },
               };
            },
         }}
         onLoading={(isLoading) => {
            if (isLoading && !LOADING_IGNORED_ROUTE.some((route) => requestUrl.includes(route))) {
               return <Loader />;
            }
         }}
         onError={(errorResponse) => {
            if (!ERROR_DISPLAYED_IGNORED_ROUTE.some((route) => requestUrl.includes(route))) {
               const { data } = errorResponse;
               let errorMessage = data?.message;
               if (Array.isArray(errorMessage)) {
                  errorMessage = errorMessage.join(', ');
               }
               return <AlertSnackbar alertType="error" message={errorMessage} />;
            }
         }}
         baseUrl={baseUrl}
      >
         {children}
      </RequestProvider>
   );
};
