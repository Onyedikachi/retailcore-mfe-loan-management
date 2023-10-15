import { Currency, CurrencyListResponse } from '@app/@types';
import { BookLoanData } from '@app/@types/book-loan';
import { REQUEST_NAMES } from '@app/constants';
import { getDefaultCurrency } from '@app/helper/currency-helper';
import { CustomerInfoFormValues } from '@app/utils/validators/book-a-loan/customer-info';
import { FacilityDetailsFormValues } from '@app/utils/validators/book-a-loan/facility-details';
import { TransactionSettingsFormValues } from '@app/utils/validators/book-a-loan/transaction-settings';
import { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { useRequestData } from 'react-http-query';

type DataType = CustomerInfoFormValues | TransactionSettingsFormValues | FacilityDetailsFormValues;
type BookLoanSteps = 'customerInformation' | 'facilityDetails' | 'transactionSettings';
interface BookLoanContextType {
   bookLoanData: BookLoanData;
   updateBookLoanData: (step: BookLoanSteps, data: DataType) => void;
   defaultCurrency: Currency | undefined;
}

// Create the context
const BookLoanContext = createContext<BookLoanContextType | null>(null);

export const useBookLoanContext = () => {
   const context = useContext(BookLoanContext);
   if (context === null) {
      throw new Error('useBookLoanContext must be used within a BookLoanProvider');
   }
   return context;
};

interface BookLoanProviderProps {
   children: ReactNode;
}

export const BookLoanProvider = ({ children }: BookLoanProviderProps) => {
   const [bookLoanData, setBookLoanData] = useState<BookLoanData>({});
   const currencies = useRequestData<CurrencyListResponse>(REQUEST_NAMES.CURRENCY_LIST);
   const defaultCurrency = getDefaultCurrency(currencies);

   const updateBookLoanData = (step: BookLoanSteps, data: DataType) => {
      setBookLoanData((prevData) => {
         return { ...prevData, [step]: data };
      });
   };

   const contextValue = useMemo<BookLoanContextType>(
      () => ({ bookLoanData, updateBookLoanData, defaultCurrency }),
      [bookLoanData, defaultCurrency]
   );

   return <BookLoanContext.Provider value={contextValue}>{children}</BookLoanContext.Provider>;
};
