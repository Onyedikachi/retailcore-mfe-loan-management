import React, { useState, ChangeEvent } from 'react';
import { Dialog, DialogContent, Box, IconButton, TextField, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Colors } from '@app/constants';

interface ModalAddNewDialogProps {
   open: boolean;
   onClose: () => void;
   onSubmit: (value: string) => void;
}

const StyledIconButton = styled(IconButton)({
   backgroundColor: Colors.White,
   filter: 'drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.25))',
   borderRadius: '3%',
   width: 40,
   height: 40,
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
});

export const ModalAddNewDialog: React.FC<ModalAddNewDialogProps> = ({ open, onClose, onSubmit }) => {
   const [value, setvalue] = useState('');

   const handleCreateCharge = () => {
      onSubmit(value);
      handleClose();
   };

   const handleClose = () => {
      setvalue('');
      onClose();
   };

   const handleClear = () => {
      setvalue('');
   };

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setvalue(e.target.value);
   };

   return (
      <Dialog open={open} onClose={handleClose}>
         <DialogContent>
            <Box display="flex" alignItems="center">
               <TextField placeholder="Enter words" value={value} onChange={handleChange} />
               <Box display="flex" justifyContent="space-between" width="35%" marginLeft="5%">
                  <StyledIconButton onClick={handleCreateCharge}>
                     <DoneAllIcon sx={{ color: Colors.Primary }} />
                  </StyledIconButton>
                  <StyledIconButton onClick={handleClear}>
                     <CloseIcon sx={{ color: Colors.Primary }} />
                  </StyledIconButton>
               </Box>
            </Box>
         </DialogContent>
      </Dialog>
   );
};
