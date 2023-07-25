/* eslint-disable camelcase */
import { OtherRequirementDocument } from '@app/@types/create-credit-product';
import { API_PATH } from '@app/constants';
import React, { createContext, useState, useContext } from 'react';
import { useRequest } from 'react-http-query';

type OtherRequirementContextType = {
   allRequirements: OtherRequirementDocument[];
   selectedRequirements: OtherRequirementDocument[];
   handleSelectRequirement: (requirement: OtherRequirementDocument[]) => void;
   handleClearSelectedRequirement: () => void;
   handleAddNewRequirement: (newRequirement: OtherRequirementDocument) => void;
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
   const [allRequirements, setAllRequirements] = useState<OtherRequirementDocument[]>([]);

   const [selectedRequirements, setSelectedRequirements] = useState<OtherRequirementDocument[]>([]);

   const [, getRequirements] = useRequest({
      onSuccess: (response) => {
         setAllRequirements(
            response?.other_eligibility_reqs?.map((item: OtherRequirementDocument) => ({
               ...item,
               accepted_format: item.accepted_format?.join(','),
            })) ?? []
         );
      },
   });

   React.useEffect(() => {
      getRequirements(API_PATH.OTHER_ELIGIBILTY_REQUIREMENT);
   }, []);

   const handleSelectRequirement = (requirement: OtherRequirementDocument[]) =>
      setSelectedRequirements(requirement);

   const handleClearSelectedRequirement = () => setSelectedRequirements([]);

   const handleAddNewRequirement = (newRequirement: OtherRequirementDocument) => {
      setAllRequirements((prevRequirements) => [...prevRequirements, newRequirement]);
   };

   const contextValue: OtherRequirementContextType = {
      allRequirements,
      selectedRequirements,
      handleSelectRequirement,
      handleAddNewRequirement,
      handleClearSelectedRequirement,
   };

   return (
      <OtherRequirementContext.Provider value={contextValue}>{children}</OtherRequirementContext.Provider>
   );
};
