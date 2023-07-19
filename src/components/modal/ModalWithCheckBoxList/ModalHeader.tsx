import React from 'react';
import { Box, IconButton, Typography,styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ModalHeaderProps {
  onClose: () => void;
  headerText: string;
}

const HeaderText = styled(Typography)({
    fontFamily: 'Roboto', 
    fontWeight: 700, 
    lineHeight: '23px', 
    letterSpacing: '0em',
    textAlign: 'left', 
  });


const ModalHeader: React.FC<ModalHeaderProps> = ({ onClose, headerText }) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <HeaderText sx={{ color: 'gray' }}>{headerText}</HeaderText>
      <IconButton color="primary" onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

export default ModalHeader;
