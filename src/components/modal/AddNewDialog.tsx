import React, { useState, ChangeEvent } from 'react';
import { Dialog, DialogContent, Box, TextField, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Colors } from '@app/constants';
import { BoxShadowIconButton } from '@app/components/atoms';

interface ModalAddNewDialogProps {
   open: boolean;
   onClose: () => void;
   onSubmit: (value: string) => void;
}

const StyledDialogContent = styled(DialogContent)(() => ({
   border: `1px solid ${Colors.Primary}`,
   borderRadius: 10,
   padding: '8px 22px',
   minWidth: '400px',
}));

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

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setvalue(e.target.value);
   };

   return (
      <Dialog open={open} sx={{}} onClose={handleClose}>
         <StyledDialogContent>
            <Box display="flex" padding={0} gap={1} alignItems="center">
               <TextField
                  sx={{ paddingY: 0.4, flex: 1 }}
                  placeholder="Enter words"
                  value={value}
                  onChange={handleChange}
                  variant="standard"
               />
               <Box display="flex" gap={1} justifyContent="space-between">
                  <BoxShadowIconButton onClick={handleCreateCharge}>
                     <DoneAllIcon sx={{ color: Colors.Primary }} />
                  </BoxShadowIconButton>
                  <BoxShadowIconButton onClick={handleClose}>
                     <CloseIcon sx={{ color: Colors.Primary }} />
                  </BoxShadowIconButton>
               </Box>
            </Box>
         </StyledDialogContent>
      </Dialog>
   );
};
