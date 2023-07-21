import { CreateProductHeader } from '@app/components/create-product/CreateProductHeader';
import { ProductFactoryLayout } from '@app/layouts/ProductFactoryLayout';
import { StepperProvider } from '@app/providers';
import { useParams } from 'react-router-dom';
import { PersonalLoanCreditContent } from './CreateLoanPages/CreditPersonalLoan';
import { CreateProductProvider } from '@app/providers/create-product';
import { useRequest } from 'react-http-query';
import { REQUEST_NAMES, RETAIL_CORE_API_PATH } from '@app/constants';

const CreateLoanPages: Record<string, Record<string, JSX.Element>> = {
   credit: {
      'personal-loans': <PersonalLoanCreditContent />,
   },
};

export const CreatePersonalLoanCreditProduct = () => {
   const { productType = '', loanType = '' } = useParams();

   // This request fetches currency list & caches for the usage elsewhere, so request is only being made once.
   useRequest({
      onMount: (getCurrencyList) => getCurrencyList(RETAIL_CORE_API_PATH.GET_CURRENCY),
      memoryStorage: true,
      name: REQUEST_NAMES.CURRENCY_LIST,
   });

   const renderCreatePage = () => {
      return CreateLoanPages[productType]?.[loanType] ?? <></>;
   };

   return (
      <CreateProductProvider>
         <StepperProvider>
            <ProductFactoryLayout
               header={<CreateProductHeader />}
               content={renderCreatePage()}
               fullContent={true}
            />
         </StepperProvider>
      </CreateProductProvider>
   );
};
