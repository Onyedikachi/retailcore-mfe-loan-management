import { Box, Divider, Typography } from '@mui/material';

export const ActivitySummary = () => {
   return (
      <Box p={2} borderRadius="5px" bgcolor="white" ml={2} height="100%">
         <Typography fontSize="20px" pb={1}>
            ACTIVITY LOG
         </Typography>
         <Divider />
         <Typography variant="body2" mt={3}>No activities found</Typography>
         <Box className="fancy-scrollbar" sx={{ height: 'calc(100% - 130px)', overflow: 'auto' }}></Box>
      </Box>
   );
};

