import { BookedLoanData, StatusCounts } from '@app/@types/loan-product';
import { createContext, useContext, ReactNode, useMemo, useState } from 'react';

interface IndividualLoanDashboardContextType {
   loanProducts?: BookedLoanData[];
   getLoanProducts: (loanProducts: BookedLoanData[], stats: StatusCounts, tab?: string) => void;
   dataCount?: StatusCounts;
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
   const [dataCount, setDataCount] = useState<StatusCounts>();

   const getLoanProducts = (loanProducts: BookedLoanData[], stats: StatusCounts, tab?: string) => {
      setLoanProducts(loanProducts);
      const rejected = loanProducts?.filter((product) => product.status === 'REJECT').length;
      const closed = loanProducts?.filter((product) => product.status === 'CLOSED').length;
      const count = {
         all: loanProducts.length,
         approved: stats?.approved,
         inReview: stats?.inReview,
         inIssue: (stats?.inIssue ?? 0) + (stats?.rejected ?? rejected),
         pending: stats?.inIssue,
         draft: (stats?.draft ?? 0) + (stats?.pending ?? 0),
         performing: stats?.performing,
         nonPerforming: stats?.nonPerforming,
         closed: stats?.closed ?? closed,
         rejected: stats?.rejected ?? rejected,
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
