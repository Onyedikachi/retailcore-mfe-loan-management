import { Currency, CurrencyListResponse } from '@app/@types';
import { BookLoanData } from '@app/@types/book-loan';
import { CustomerData } from '@app/@types/customer';
import { REQUEST_NAMES } from '@app/constants';
import { getDefaultCurrency } from '@app/helper/currency-helper';
import { CustomerInfoFormValues } from '@app/utils/validators/book-a-loan/customer-info';
import { FacilityDetailsFormValues } from '@app/utils/validators/book-a-loan/facility-details';
import { TransactionSettingsFormValues } from '@app/utils/validators/book-a-loan/transaction-settings';
import { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { useRequestData } from 'react-http-query';

type DataType = CustomerInfoFormValues | TransactionSettingsFormValues | FacilityDetailsFormValues;
type BookLoanSteps = 'customerInformation' | 'facilityDetails' | 'transactionSettings';
export type AccountNumber = { label: string; subtitle: string; customerId: string };
interface BookLoanContextType {
   bookLoanData: BookLoanData;
   updateBookLoanData: (step: BookLoanSteps, data: DataType) => void;
   defaultCurrency: Currency | undefined;
   getCustomersData: (customersData: CustomerData[]) => void;
   accountNumbers: AccountNumber[] | undefined;
   getSelectedCustomer: (id: string) => void;
   selectedCustomerId: string | undefined;
   selectedCustomer: CustomerData | undefined;
}

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
   const [customers, setCustomers] = useState<CustomerData[]>();
   const [accountNumbers, setAccountNumbers] = useState<AccountNumber[]>();
   const [selectedCustomerId, setSelectedCustomerId] = useState<string>();
   const [selectedCustomer, setSelectedCustomer] = useState<CustomerData>();

   const updateBookLoanData = (step: BookLoanSteps, data: DataType) => {
      setBookLoanData((prevData) => {
         return { ...prevData, [step]: data };
      });
   };

   const getCustomersData = (customersData: CustomerData[]) => {
      setCustomers(customersData);
      const customerAccountInfoArray = customersData?.flatMap((customerData: CustomerData) => {
         const { firstName, surname, otherNames } = customerData.customer_profiles[0];
         return customerData.customer_account_balances.map((accountBalance) => ({
            label: accountBalance.accountNumber,
            subtitle: `${firstName} ${otherNames ?? ''} ${surname}`,
            customerId: customerData.customerId,
         }));
      });
      setAccountNumbers(customerAccountInfoArray);
   };

   const getSelectedCustomer = (id: string) => {
      setSelectedCustomerId(id);
      setSelectedCustomer(
         customers?.filter((customer) => {
            return customer?.customerId === id;
         })[0]
      );
   };

   const contextValue = useMemo<BookLoanContextType>(
      () => ({
         bookLoanData,
         defaultCurrency,
         accountNumbers,
         selectedCustomerId,
         selectedCustomer,
         updateBookLoanData,
         getSelectedCustomer,
         getCustomersData,
      }),
      [bookLoanData, defaultCurrency, accountNumbers, selectedCustomerId]
   );

   return <BookLoanContext.Provider value={contextValue}>{children}</BookLoanContext.Provider>;
};
