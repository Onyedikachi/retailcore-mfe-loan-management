import { Currency, CurrencyListResponse } from '@app/@types';
import { BookLoanData, BookLoanDataType } from '@app/@types/book-loan';
import { CustomerData } from '@app/@types/customer';
import { CUSTOMER_MANAGEMENT_PATH, REQUEST_NAMES } from '@app/constants';
import { mapBookLoanToSchema, mapSchemaToBookLoan } from '@app/mappers/book-loan-mapper';
import { getDefaultCurrency } from '@app/helper/currency-helper';
import { createContext, useContext, useState, ReactNode, useMemo, useEffect } from 'react';
import { useRequest, useRequestData } from 'react-http-query';
import { BookedLoanData, LoanProductData } from '@app/@types/loan-product';

type BookLoanSteps = 'customerInformation' | 'facilityDetails' | 'transactionSettings';
export type AccountNumber = { label: string; subtitle: string; customerId: string };
export interface LoanProduct {
   id: string;
   name: string;
}
interface BookLoanContextType {
   bookLoanData: BookLoanData;
   updateBookLoanData: (step: BookLoanSteps, data: BookLoanDataType) => void;
   defaultCurrency: Currency | undefined;
   getCustomersData: (customersData: CustomerData[]) => void;
   accountNumbers: AccountNumber[] | undefined;
   getSelectedCustomer: (id: string) => void;
   selectedCustomerId: string | undefined;
   selectedCustomer: CustomerData | undefined;
   persona: string | undefined;
   customerEligibility: {
      isEligible: boolean;
      message: string;
   };
   productNames?: LoanProduct[];
   backendData: any;
   getProductData: (productData: LoanProductData[]) => void;
   getSelectedProduct: (loanProduct: LoanProductData | undefined) => void;
   selectedProduct: LoanProductData | undefined;
   resetBookLoanData: () => void;
   getLoanDataToModify: (loan: BookedLoanData) => void;
   getCustomer: (customersData: CustomerData) => void;
   getInputtedPrincipal: (principal: string) => void;
   inputtedPrincipal?: string;
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
   const { GET_CUSTOMER } = CUSTOMER_MANAGEMENT_PATH;

   const [customers, setCustomers] = useState<CustomerData[]>();
   const [accountNumbers, setAccountNumbers] = useState<AccountNumber[]>();
   const [selectedCustomerId, setSelectedCustomerId] = useState<string>();
   const [selectedCustomer, setSelectedCustomer] = useState<CustomerData>();
   const [selectedProduct, setSelectedProduct] = useState<LoanProductData>();
   const [productNames, setProductNames] = useState<LoanProduct[]>();
   const [inputtedPrincipal, setInputtedPrincipal] = useState<string>();
   const [backendData, setBackendData] = useState<any>();
   const [isDraft, setIsDraft] = useState<boolean>();

   const [, refetchAllProductInfo] = useRequest({
      onSuccess: (response) => {
         setSelectedCustomer(response?.data.data);
      },
   });
   const fetchProductActivities = (id: any) => {
      refetchAllProductInfo(`${GET_CUSTOMER}/${id}`, { showSuccess: false, showError: false });
   };
   const updateBookLoanData = (step?: BookLoanSteps, data?: BookLoanDataType) => {
      const isDraft = step === 'customerInformation' || step === 'facilityDetails';
      setIsDraft(isDraft);
      if (data && step) {
         setBookLoanData((prevData) => {
            return { ...prevData, [step]: data };
         });
      }
   };
   const getLoanDataToModify = (loan: BookedLoanData) => {
      const loanContextData = mapSchemaToBookLoan(loan);
      setBookLoanData(loanContextData);
      setSelectedCustomerId(loan.customerId);
   };
   const resetBookLoanData = () => setBookLoanData({});

   useEffect(() => {
      const mappedBackendData = mapBookLoanToSchema(bookLoanData, selectedCustomer, selectedProduct, isDraft);
      setBackendData(mappedBackendData);
   }, [bookLoanData, selectedCustomer, selectedProduct, isDraft]);

   const getSelectedProduct = (loanProduct: LoanProductData | undefined) => {
      setSelectedProduct(loanProduct);
   };

   const getProductData = (allLoanProducts: LoanProductData[]) => {
      const names = allLoanProducts
         ?.filter((e) => e.requestStatus === 'Approved' && e.status === 'Active')
         .map((loan) => {
            return { name: loan.name, id: loan.id };
         });
      setProductNames(names);
   };

   const getCustomersData = (customersData: CustomerData[]) => {
      setCustomers(customersData);
      const customerAccountInfoArray = customersData?.flatMap((customerData: CustomerData) => {
         const profile = customerData.customer_profiles[0];
         return customerData.customer_products.map((accountBalance) => ({
            label: accountBalance.accountNumber,
            subtitle: `${profile?.firstName} ${profile?.otherNames ?? ''} ${profile?.surname}`,
            customerId: customerData.customerId,
         }));
      });
      setAccountNumbers(customerAccountInfoArray);
   };
   const getSelectedCustomer = (id: string) => {
      fetchProductActivities(id);
      setSelectedCustomerId(id);
   };
   const getCustomer = (customersData: CustomerData) => setSelectedCustomer(customersData);

   const persona: string | undefined = selectedCustomer?.risk_assessments?.filter(
      (assessments) =>
         assessments?.sectionName == "Customer's Identity" && assessments?.parameter == 'Customer Persona'
   )?.[0]?.parameterOption;

   const isActive = selectedCustomer?.status === 'Active';
   const hasKYC = isActive && selectedCustomer?.approvalStatus === 'Approved';
   let message = '';
   if (!hasKYC && !isActive) {
      message = "Customer's KYC is Incomplete and Account Status is Inactive";
   } else if (!hasKYC) {
      message = "Customer's KYC is Incomplete";
   } else if (!isActive) {
      message = "Customer's Account Status is Inactive";
   }

   const customerEligibility: { isEligible: boolean; message: string } = {
      isEligible: hasKYC && isActive,
      message: message,
   };

   const getInputtedPrincipal = (principal?: string) => setInputtedPrincipal(principal);

   const contextValue = useMemo<BookLoanContextType>(
      () => ({
         bookLoanData,
         defaultCurrency,
         accountNumbers,
         selectedCustomerId,
         selectedCustomer,
         persona,
         selectedProduct,
         productNames,
         backendData,
         customerEligibility,
         inputtedPrincipal,
         updateBookLoanData,
         getSelectedCustomer,
         getCustomersData,
         getSelectedProduct,
         getProductData,
         resetBookLoanData,
         getLoanDataToModify,
         getCustomer,
         getInputtedPrincipal,
      }),
      [
         bookLoanData,
         defaultCurrency,
         accountNumbers,
         selectedCustomer,
         selectedCustomerId,
         persona,
         customerEligibility,
         selectedProduct,
         backendData,
         productNames,
         inputtedPrincipal,
      ]
   );

   return <BookLoanContext.Provider value={contextValue}>{children}</BookLoanContext.Provider>;
};
