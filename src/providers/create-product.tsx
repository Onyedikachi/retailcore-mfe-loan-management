import React, { useState } from 'react';
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
   addProductStep: <T extends keyof CreateCreditProduct>(stepKey: T, values: CreateCreditProduct[T]) => void;
   setCurrency: (currency: string) => void;
}

export const CreateProductContext = React.createContext<null | CreateProductContextProps>(null);

export const CreateProductProvider = ({ children }: CreateProductProviderProps) => {
   const [productMeta, setProductMeta] = useState<null | ProductMeta>(null);

   const addProductStep = <T extends keyof CreateCreditProduct>(
      stepKey: T,
      values: CreateCreditProduct[T]
   ) => {
      setProductMeta((initialProductMeta) => ({
         ...initialProductMeta,
         productDetails: {
            ...initialProductMeta?.productDetails,
            [stepKey]: values,
         },
      }));
   };

   const setCurrency = (currency: string) => {
      setProductMeta((initialProductMeta) => ({
         ...initialProductMeta,
         currency,
      }));
   };

   return (
      <CreateProductContext.Provider value={{ setCurrency, addProductStep, productMeta }}>
         {children}
      </CreateProductContext.Provider>
   );
};
