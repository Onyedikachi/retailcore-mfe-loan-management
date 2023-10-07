import { BookLoanData } from '@app/@types/book-loan';
import { CustomerInfoFormValues } from '@app/utils/validators/book-a-loan/customer-info';
import { FacilityDetailsFormValues } from '@app/utils/validators/book-a-loan/facility-details';
import { TransactionSettingsFormValues } from '@app/utils/validators/book-a-loan/transaction-settings';
import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

type DataType = CustomerInfoFormValues | TransactionSettingsFormValues | FacilityDetailsFormValues;
interface BookLoanContextType {
   bookLoanData: BookLoanData;
   updateBookLoanData: (data: DataType) => void;
   stepsCompleted?: number;
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
   const [stepCompleted, setStepCompleted] = useState<number | undefined>();
   const steps: (keyof BookLoanData)[] = ['customerInformation', 'facilityDetails', 'transactionSettings'];

   const updateBookLoanData = (data: DataType) => {
      if (data as CustomerInfoFormValues) {
         setBookLoanData((prevData) => {
            return { ...prevData, [steps[0]]: data };
         });
         setStepCompleted(1);
      } else if (data as FacilityDetailsFormValues) {
         setBookLoanData((prevData) => {
            return { ...prevData, [steps[1]]: data };
         });
         setStepCompleted(2);
      } else {
         setBookLoanData((prevData) => {
            return { ...prevData, [steps[2]]: data };
         });
         setStepCompleted(3);
      }
   };

   const contextValue = useMemo<BookLoanContextType>(
      () => ({
         bookLoanData,
         updateBookLoanData,
         stepCompleted,
      }),
      [bookLoanData, stepCompleted]
   );

   return <BookLoanContext.Provider value={contextValue}>{children}</BookLoanContext.Provider>;
};
