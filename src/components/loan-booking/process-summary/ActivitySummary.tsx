import { ActivityLog } from '@app/components/atoms/ActivityLog';
import { Box } from '@mui/material';

export const ActivitySummary = () => {
   return (
      <Box p={2} borderRadius="5px" bgcolor="white" ml={2} height="100%">
         <ActivityLog />
      </Box>
   );
};
