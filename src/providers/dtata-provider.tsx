import React, { createContext, useState, useContext } from 'react';
const allAppData = {
   otherEligibilityRequirement: [],
   // ...
};

interface CreateContextProps {
   appData: AppData;
   setAppData: React.Dispatch<React.SetStateAction<AppData>>;
}
export type AppData = typeof allAppData;

const DataContext = createContext<CreateContextProps | null>(null);
export const useDataContext = () => {
   const context = useContext(DataContext);
   if (!context) {
      throw new Error('useData must be used within a DataProvider');
   }
   return context;
};

const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const [appData, setAppData] = useState<AppData>(allAppData);

   return <DataContext.Provider value={{ appData, setAppData }}>{children}</DataContext.Provider>;
};

export default DataProvider;
