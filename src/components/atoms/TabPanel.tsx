import { Box } from '@mui/material';
import { ReactNode } from 'react';

export const TabPanel: React.FC<{ children: ReactNode; value: number; index: number }> = ({
   children,
   value,
   index,
}) => {
   return (
      <Box role="tabpanel" hidden={value !== index}>
         {value === index && <Box>{children}</Box>}
      </Box>
   );
};
