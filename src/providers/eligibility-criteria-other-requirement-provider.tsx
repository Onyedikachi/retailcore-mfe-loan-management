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
         setAllRequirements(response);
      },
   });

   React.useEffect(() => {
      //setAllRequirements(dummyData);
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

const dummyData = [
   {
      id: '0861ff0e-bd1d-4ea8-a4ac-06c6625cf4cd',
      title: 'New requirement 1',
      status: 'Added',
      description: 'sjjdhf',
      accepted_format: 'PDF,PNG,JPEG',
      is_doc_required: true,
      period_from: 3,
      period_to: 5,
      period: 'monthly',
      tenant_id: '93ce8340-37ff-4db7-bd0a-6b0342eed289',
      created_by: 'test user 1',
      created_by_id: '306b11fe-516f-44dc-9c7f-96a5de2dca82',
      created_at: '2023-07-23T15:48:28.347Z',
      updated_by: null,
      updated_by_id: null,
      updated_at: null,
      deleted_by: null,
      deleted_by_id: null,
      deleted_at: null,
   },
   {
      id: 'eac7478b-1f8e-4a90-ae63-3f8f87c92ec9',
      title: 'New requirement 2',
      status: 'Added',
      description: 'abcdefg',
      accepted_format: 'DOCX,TXT',
      is_doc_required: false,
      period_from: 1,
      period_to: 12,
      period: 'yearly',
      tenant_id: '93ce8340-37ff-4db7-bd0a-6b0342eed289',
      created_by: 'test user 2',
      created_by_id: '306b11fe-516f-44dc-9c7f-96a5de2dca82',
      created_at: '2023-07-24T10:12:34.567Z',
      updated_by: null,
      updated_by_id: null,
      updated_at: null,
      deleted_by: null,
      deleted_by_id: null,
      deleted_at: null,
   },
   // Add three more data objects following the same structure
   // ...
];
