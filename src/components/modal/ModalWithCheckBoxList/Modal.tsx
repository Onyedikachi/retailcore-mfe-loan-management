import React, { useState } from 'react';
import { Modal } from '@mui/material';
import ModalHeader from './ModalHeader';
import ModalContent from './ModalContent';
import {ModalAddNewDialog} from './ModalAddNewDialog';

interface ReusableModalProps {
  open: boolean;
  onClose: () => void;
  listData: {
    labelName: string;
    checked: boolean;
    children: { name: string; checked: boolean }[];
  }[];
  onAddCharge: (chargeName: string) => void;
  onCheckboxToggle: (labelName: string) => void;
  onChildCheckboxToggle: (labelName: string, childIndex: number) => void;
  headerText: string; 
  addButtonText: string; 
}

const ReusableModal: React.FC<ReusableModalProps> = ({
  open,
  onClose,
  listData: initialListData,
  onAddCharge,
  onCheckboxToggle,
  onChildCheckboxToggle,
  headerText, 
  addButtonText, 
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [showCreateCharge, setShowCreateCharge] = useState(false);
  const [chargeName, setChargeName] = useState('');

  const handleSearch = (searchBy: string) => {
    setSearchValue(searchBy);
  };

  const handleCreateChargeClick = () => {
    setShowCreateCharge(true);
  };

  const handleCloseCreateCharge = () => {
    setShowCreateCharge(false);
    setChargeName('');
  };



  return (
    <>
      <Modal open={open} onClose={onClose}>
        <ModalContent
          handleSearch={handleSearch}
          onAddChargeClick={handleCreateChargeClick}
          initialListData={initialListData}
          onCheckboxToggle={onCheckboxToggle}
          onChildCheckboxToggle={onChildCheckboxToggle}
          addButtonText={addButtonText} 
          modalHeader={<ModalHeader headerText={headerText} onClose={onClose} />} 
        />
      </Modal>
      <ModalAddNewDialog
        open={showCreateCharge}
        onClose={handleCloseCreateCharge}
        onAddCharge={onAddCharge}
      />
    </>
  );
};

export default ReusableModal;
