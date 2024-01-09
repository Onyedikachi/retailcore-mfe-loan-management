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

   const getLoanProducts = (loanProducts: BookedLoanData[], stats: StatusCounts) => {
      setLoanProducts(loanProducts);
      const count = {
         all: stats?.all ?? 0,
         approved: stats?.approved ?? 0,
         inReview: stats?.inReview ?? 0,
         inIssue: stats?.inIssue ?? 0,
         pending: stats?.inIssue ?? 0,
         draft: stats?.draft ?? 0,
         performing: stats?.performing,
         nonPerforming: stats?.nonPerforming,
         closed: stats?.closed ?? 0,
         allRecords: stats?.allRecords ?? 0,
         allRequest: stats?.allRequest ?? 0,
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
