import React, { useState } from 'react';
import { Modal } from '@mui/material';
import ModalHeader from './ModalHeader';
import ModalContent from './ModalContent';
import { ModalAddNewDialog } from './ModalAddNewDialog';

interface ReusableModalProps {
   open: boolean;
   onClose: () => void;
   listData: {
      labelName: string;
      checked: boolean;
      children: { name: string; checked: boolean }[];
   }[];
   onSubmit: (value: string) => void;
   onCheckboxToggle: (labelName: string) => void;
   onChildCheckboxToggle: (labelName: string, childIndex: number) => void;
   headerText: string;
   addButtonText: string;
}

const ReusableModal: React.FC<ReusableModalProps> = ({
   open,
   onClose,
   listData: initialListData,
   onSubmit,
   onCheckboxToggle,
   onChildCheckboxToggle,
   headerText,
   addButtonText,
}) => {
   const [searchValue, setSearchValue] = useState('');
   const [showCreateCharge, setShowCreateCharge] = useState(false);
   const [value, setvalue] = useState('');

   const handleSearch = (searchBy: string) => {
      setSearchValue(searchBy);
   };

   const handleCreateChargeClick = () => {
      setShowCreateCharge(true);
   };

   const handleCloseCreateCharge = () => {
      setShowCreateCharge(false);
      setvalue('');
   };

   return (
      <>
         <Modal open={open} onClose={onClose}>
            <ModalContent
               handleSearch={handleSearch}
               onSubmitClick={handleCreateChargeClick}
               initialListData={initialListData}
               onCheckboxToggle={onCheckboxToggle}
               onChildCheckboxToggle={onChildCheckboxToggle}
               addButtonText={addButtonText}
               modalHeader={<ModalHeader headerText={headerText} onClose={onClose} />}
            />
         </Modal>
         <ModalAddNewDialog open={showCreateCharge} onClose={handleCloseCreateCharge} onSubmit={onSubmit} />
      </>
   );
};

export default ReusableModal;
