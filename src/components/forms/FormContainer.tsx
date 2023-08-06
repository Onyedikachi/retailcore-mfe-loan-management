import { Box } from '@mui/material';
import { ReactNode } from 'react';

const FormContainer: React.FC<{ children: ReactNode; minHeight?: string }> = ({ children, minHeight }) => {
   return (
      <Box
         sx={{
            minHeight: minHeight,
            boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)',
            p: 3,
            m: 1,
            borderRadius: '8px',
         }}
      >
         {children}
      </Box>
   );
};

export default FormContainer;
