import React, { useState, ChangeEvent } from 'react'; 
import { Dialog, DialogContent, Box, IconButton, TextField,styled } from '@mui/material';
import CloseCustomIcon from '../../atoms/Icons/Close';
import CheckCustomIcon from '../../atoms/Icons/Check';

interface CreateChargeDialogProps {
  open: boolean;
  onClose: () => void;
  onAddCharge: (chargeName: string) => void;
}


export const CreateChargeDialog: React.FC<CreateChargeDialogProps> = ({ open, onClose, onAddCharge }) => {
  const [chargeName, setChargeName] = useState('');

  const handleCreateCharge = () => {
    onAddCharge(chargeName);
    handleClose();
  };

  const handleClose = () => {
    setChargeName('');
    // onClose();
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
            <IconButton onClick={handleClose}>
              <CloseCustomIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

