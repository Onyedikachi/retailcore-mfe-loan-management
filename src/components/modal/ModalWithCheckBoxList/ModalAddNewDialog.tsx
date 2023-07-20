import React, { useState, ChangeEvent } from 'react'; 
import { Dialog, DialogContent, Box, IconButton, TextField,styled } from '@mui/material';
import CloseCustomIcon from '../../atoms/Icons/Close';
import CheckCustomIcon from '../../atoms/Icons/Check';

interface ModalAddNewDialogProps {
  open: boolean;
  onClose: () => void;
  onAddCharge: (chargeName: string) => void;
}


export const ModalAddNewDialog: React.FC<ModalAddNewDialogProps> = ({ open, onClose, onAddCharge }) => {
  const [chargeName, setChargeName] = useState('');

  const handleCreateCharge = () => {
    onAddCharge(chargeName);
    handleClose();
  };

  const handleClose = () => {
    setChargeName('');
    onClose();
  };

  const handleClear = () => {
    setChargeName('');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChargeName(e.target.value); 
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <Box display="flex" alignItems="center">
          <TextField
            placeholder="Enter words"
            value={chargeName}
            onChange={handleChange}
          />
          <Box display="flex">
            <IconButton onClick={handleCreateCharge}>
              <CheckCustomIcon />
            </IconButton>
            <IconButton onClick={handleClear}>
              <CloseCustomIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

