import React from 'react';
import { Box, IconButton, Typography,styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ModalHeaderProps {
  onClose: () => void;
  headerText: string;
}




const ModalHeader: React.FC<ModalHeaderProps> = ({ onClose, headerText }) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Typography variant="h4">{headerText}</Typography>
      <IconButton color="primary" onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

export default ModalHeader;
