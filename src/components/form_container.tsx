import { Colors } from '@app/constants';
import { Box } from '@mui/material';
import { ReactNode } from 'react';

const FormContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
   return (
      <Box sx={{ border: `1px solid ${Colors.LightGray}`, p: 3, m: 1, borderRadius: '8px' }}>{children}</Box>
   );
};

export default FormContainer;
