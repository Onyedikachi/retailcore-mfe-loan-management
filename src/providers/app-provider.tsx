import { Currency, CurrencyListResponse } from '@app/@types';
import { REQUEST_NAMES } from '@app/constants';
import { getDefaultCurrency } from '@app/helper/currency-helper';
import { createContext, useContext, ReactNode, useMemo } from 'react';
import { useRequestData } from 'react-http-query';

interface AppContextType {
   defaultCurrency: Currency | undefined;
}

const AppContext = createContext<AppContextType | null>(null);

export const useAppContext = () => {
   const context = useContext(AppContext);
   if (context === null) {
      throw new Error('useAppContext must be used within a AppProvider');
   }
   return context;
};

interface AppProviderProps {
   children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
   const currencies = useRequestData<CurrencyListResponse>(REQUEST_NAMES.CURRENCY_LIST);
   const defaultCurrency = getDefaultCurrency(currencies);

   const contextValue = useMemo<AppContextType>(() => ({ defaultCurrency }), [defaultCurrency]);

   return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};
