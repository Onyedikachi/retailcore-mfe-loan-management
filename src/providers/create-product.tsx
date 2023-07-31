import React, { useCallback, useMemo, useState } from 'react';
import { CreateCreditProduct } from '@app/@types/create-credit-product';

interface CreateProductProviderProps {
   children: React.ReactNode;
}

interface ProductMeta {
   currency?: string;
   productDetails?: CreateCreditProduct;
}

interface CreateProductContextProps {
   productMeta: ProductMeta | null;
   submitted: {
      productInformation: boolean;
      eligibilityCriteria: boolean;
   };
   addProductStep: <T extends keyof CreateCreditProduct>(stepKey: T, values: CreateCreditProduct[T]) => void;
   setCurrency: (currency: string) => void;
   updateProductStepState: (step: keyof CreateCreditProduct, isSubmitted: boolean) => void;
}

const CreateProductContext = React.createContext<null | CreateProductContextProps>(null);

export const useCreateProductContext = () => {
   const createProductContext = React.useContext(CreateProductContext);

   if (!createProductContext) {
      throw Error('Component needs to be a descendant of CreateProductProvider');
   }

   return createProductContext;
};

export const CreateProductProvider = ({ children }: CreateProductProviderProps) => {
   const [productMeta, setProductMeta] = useState<null | ProductMeta>(null);
   const [{ productInformationSubmitted, eligibilityCriteriaSubmitted }, setProductStepState] = useState({
      productInformationSubmitted: false,
      eligibilityCriteriaSubmitted: false,
   });

   const addProductStep = useCallback(
      <T extends keyof CreateCreditProduct>(stepKey: T, values: CreateCreditProduct[T]) => {
         setProductMeta((initialProductMeta) => ({
            ...initialProductMeta,
            productDetails: {
               ...initialProductMeta?.productDetails,
               [stepKey]: values,
            },
         }));
      },
      [setProductMeta]
   );

   const setCurrency = useCallback(
      (currency: string) => {
         setProductMeta((initialProductMeta) => ({
            ...initialProductMeta,
            currency,
         }));
      },
      [setProductMeta]
   );

   /** this is used to set if a step has been submitted. */
   const updateProductStepState = useCallback(
      (step: keyof CreateCreditProduct, isSubmitted: boolean) => {
         setProductStepState((initial) => ({
            ...initial,
            [step]: isSubmitted,
         }));
      },
      [setProductStepState]
   );

   const providerValues = useMemo(
      () => ({
         submitted: {
            productInformation: productInformationSubmitted,
            eligibilityCriteria: eligibilityCriteriaSubmitted,
         },
         setCurrency,
         addProductStep,
         productMeta,
         updateProductStepState,
      }),
      [
         setCurrency,
         addProductStep,
         productMeta,
         updateProductStepState,
         productInformationSubmitted,
         eligibilityCriteriaSubmitted,
      ]
   );

   return <CreateProductContext.Provider value={providerValues}>{children}</CreateProductContext.Provider>;
};
