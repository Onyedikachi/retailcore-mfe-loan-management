import { BookedLoanData, StatusCounts } from '@app/@types/loan-product';
import { DataCount } from '@app/constants/dashboard';
import { createContext, useContext, ReactNode, useMemo, useState } from 'react';

interface IndividualLoanDashboardContextType {
   loanProducts?: BookedLoanData[];
   getLoanProducts: (loanProducts: BookedLoanData[], stats: StatusCounts, tab?: string) => void;
   dataCount?: DataCount;
   getLoanProduct: (loan: BookedLoanData) => void;
   loanProduct?: BookedLoanData;
}

const IndividualLoanDashboardContext = createContext<IndividualLoanDashboardContextType | null>(null);

export const useIndividualLoanDashboardContext = () => {
   const context = useContext(IndividualLoanDashboardContext);
   if (context === null) {
      throw new Error(
         'useIndividualLoanDashboardContext must be used within a IndividualLoanDashboardProvider'
      );
   }
   return context;
};

interface IndividualLoanDashboardProviderProps {
   children: ReactNode;
}

export const IndividualLoanDashboardProvider = ({ children }: IndividualLoanDashboardProviderProps) => {
   const [loanProducts, setLoanProducts] = useState<BookedLoanData[]>();
   const [loanProduct, setLoanProduct] = useState<BookedLoanData>();
   const [dataCount, setDataCount] = useState<DataCount>();

   const getLoanProducts = (loanProducts: BookedLoanData[], stats: StatusCounts, tab?: string) => {
      setLoanProducts(loanProducts);
      const count = {
         all: loanProducts.length,
         approved: loanProducts?.filter((product) => product.status === 'APPROVED').length,
         inReview: loanProducts?.filter((product) => product.status === 'IN_REVIEW').length,
         inIssue: loanProducts?.filter((product) => product.status === 'IN_ISSUE').length,
         draft: loanProducts?.filter((product) => product.status === 'DRAFT' || product.status === 'PENDING')
            .length,
         performing: loanProducts?.filter((product) => product.status === 'PERFORMING').length,
         nonPerforming: loanProducts?.filter((product) => product.status === 'NON_PERFORMING').length,
         closed: loanProducts?.filter((product) => product.status === 'CLOSED').length,
      };
      setDataCount(count);
   };
   const getLoanProduct = (loan: BookedLoanData) => {
      setLoanProduct(loan);
   };

   const contextValue = useMemo<IndividualLoanDashboardContextType>(
      () => ({ loanProducts, loanProduct, dataCount, getLoanProducts, getLoanProduct }),
      [loanProducts, loanProduct, dataCount]
   );

   return (
      <IndividualLoanDashboardContext.Provider value={contextValue}>
         {children}
      </IndividualLoanDashboardContext.Provider>
   );
};
