import { ObjectAny } from '@app/@types';
import { API_PATH } from '@app/constants';
import React, { createContext, useState, useContext } from 'react';
import { useRequest } from 'react-http-query';

type OtherRequirementContextType = {
   allRequirements: ObjectAny[];
   selectedRequirements: ObjectAny[];
   configuredRequirements: ObjectAny[];
   isConfigured: boolean;
   handleSelectRequirement: (requirement: ObjectAny[]) => void;
   handleClearSelectedRequirement: () => void;
   handleConfigureRequirement: (requirement: ObjectAny[]) => void;
   handleAddNewRequirement: (newRequirement: ObjectAny[]) => void;

};

const OtherRequirementContext = createContext<OtherRequirementContextType | null>(null);

export const useOtherRequirementContext = (): OtherRequirementContextType => {
   const context = useContext(OtherRequirementContext);
   if (!context) {
      throw new Error('useOtherRequirement must be used within an OtherRequirementProvider');
   }
   return context;
};

export const OtherRequirementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const [allRequirements, setAllRequirements] = useState<ObjectAny[]>([]);

   const [selectedRequirements, setSelectedRequirements] = useState<ObjectAny[]>([]);
   const [configuredRequirements, setConfiguredRequirements] = useState<ObjectAny[]>([]);
   const [isConfigured, setIsConfigured] = useState(false);

   const [{ data }, getRequirements] = useRequest({
      onSuccess: () => {
         setAllRequirements(data);
      },
   });

   React.useEffect(() => {
      getRequirements(API_PATH.OTHER_ELIGIBILTY_REQUIREMENT);
   }, []);

   const handleSelectRequirement = (requirement: ObjectAny[]) => {
      setSelectedRequirements(requirement);
   };
   const handleClearSelectedRequirement = () => setSelectedRequirements([]);

   const handleConfigureRequirement = (requirement: ObjectAny[]) => {
      setConfiguredRequirements(requirement);
      setIsConfigured(true);
   };

   const handleAddNewRequirement = (newRequirement: ObjectAny[]) => {
      setAllRequirements((prevRequirements) => [...prevRequirements, newRequirement]);
   };

   // Function to handle searching for requirements
 

   // Value to be provided by the context
   const contextValue: OtherRequirementContextType = {
     allRequirements,
     configuredRequirements,
     selectedRequirements,
     handleSelectRequirement,
     handleConfigureRequirement,
     handleAddNewRequirement,
     handleClearSelectedRequirement,
     isConfigured,
   };

   return (
      <OtherRequirementContext.Provider value={contextValue}>{children}</OtherRequirementContext.Provider>
   );
};
