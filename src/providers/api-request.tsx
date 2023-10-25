import { AlertSnackbar } from '@app/components';
import { Loader } from '@app/components/Loader';
import { environmentVar } from '@app/constants';
import { RequestProvider } from 'react-http-query';
import { axiosInstance } from '@Sterling/shared';

interface APIRequestProviderProps {
   children: React.ReactNode;
}

export const APIRequestProvider = ({ children }: APIRequestProviderProps) => {
   const { API_URL } = environmentVar();
   const baseUrl = API_URL ?? '';

   const renderErrorSnackBar = (errorResponse: any) => {
      const { data } = errorResponse;
      let errorMessage = data?.message;
      if (Array.isArray(errorMessage)) {
         errorMessage = errorMessage.join(', ');
      }
      return <AlertSnackbar alertType="error" message={errorMessage} />;
   };

   const renderSuccessSnackbar = (response: any) => {
      return <AlertSnackbar alertType="success" message={response.message ?? 'Request Successful'} />;
   };

   const renderLoader = () => <Loader />;

   return (
      <RequestProvider
         interceptors={{
            request(payload) {
               return { ...payload, headers: { 'Content-Type': 'application/json' } };
            },
            response(payload) {
               return { ...payload };
            },
         }}
         onLoading={renderLoader}
         onError={renderErrorSnackBar}
         onSuccess={renderSuccessSnackbar}
         baseUrl={baseUrl}
         axiosInstance={axiosInstance}
      >
         {children}
      </RequestProvider>
   );
};
