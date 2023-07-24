import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Colors } from '@app/constants';

interface ModalHeaderProps {
   onClose: () => void;
   headerText: string;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ onClose, headerText }) => {
   return (
      <Box
         display="flex"
         sx={{ borderBottom: `1px solid ${Colors.BgCardGray}`, mb: 1 }}
         alignItems="center"
         justifyContent="space-between"
      >
         <Typography variant="h5">{headerText}</Typography>
         <IconButton onClick={onClose}>
            <CloseIcon />
         </IconButton>
      </Box>
   );
};

export default ModalHeader;
