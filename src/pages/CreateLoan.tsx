import { CreateProductHeader } from '@app/components/create-product/CreateProductHeader';
import { ProductFactoryLayout } from '@app/layouts/ProductFactoryLayout';
import { StepperProvider } from '@app/providers';
import { useParams } from 'react-router-dom';
import { PersonalLoanCreditContent } from './CreateLoanPages/CreditPersonalLoan';

const CreateLoanPages: Record<string, Record<string, JSX.Element>> = {
   credit: {
      'personal-loan': <PersonalLoanCreditContent />,
   },
};

export const CreatePersonalLoanCreditProduct = () => {
   const { productType = '', loanType = '' } = useParams();

   const renderCreatePage = () => {
      return CreateLoanPages[productType]?.[loanType] ?? <></>;
   };

   return (
      <StepperProvider>
         <ProductFactoryLayout
            header={<CreateProductHeader />}
            content={renderCreatePage()}
            fullContent={true}
         />
      </StepperProvider>
   );
};
