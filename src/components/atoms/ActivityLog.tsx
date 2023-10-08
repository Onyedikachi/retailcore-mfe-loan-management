import React from 'react';
import { Box, Divider, Typography, styled, Stack } from '@mui/material';

interface Log {
   pending: boolean;
   date?: string;
   subtitle?: string;
   title: string;
}
interface ActivityLogProps {
   logs?: Array<Log>;
   title?: string;
}

const VerticalRule = styled(Box)<{ pending: boolean }>(({ pending }) => ({
   height: 38,
   borderLeft: `1px ${pending ? 'dashed' : 'solid'} `,
   marginLeft: '12.5px',
   marginTop: '-5px',
}));

const RoundedBullet = styled('div')<{ pending: boolean }>(({ pending, theme: { palette } }) => ({
   position: 'relative',
   height: 25,
   width: 25,
   borderRadius: '50%',
   border: `1.5px solid ${pending ? palette.gray.main : palette.success.main}`,
   background: `${pending ? 'transparent' : palette.success.main}`,
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   '&:before': {
      content: '""',
      position: 'absolute',
      border: `0.5px solid ${pending ? palette.gray.main : palette.success.main}`,
      background: `${pending ? 'transparent' : 'white'}`,
      height: 17,
      width: 17,
      borderRadius: '50%',
   },
}));

export const ActivityLog: React.FC<ActivityLogProps> = ({ logs, title = 'ACTIVITY LOG' }) => {
   const data: Array<Log> = [
      { pending: false, subtitle: 'Verify and Submit request for processing', title: 'Pending Actitvity' },
   ];

   return (
      <Box sx={{ px: '12px' }}>
         <Typography variant="h5" mb={0.5}>
            {title}
         </Typography>
         <Divider />
         {!logs && <Typography sx={{ my: 2, fontSize: 12, fontWeight: 400 }}>No activities found</Typography>}
         <Box sx={{ marginTop: '23px' }}>
            {(logs ?? data)?.map(({ pending, title, subtitle, date }, index) => (
               <Box key={date}>
                  <Stack direction="row" alignItems="center" columnGap="12px">
                     <Box>
                        <RoundedBullet pending={!pending} />
                     </Box>
                     <Box flex={1}>
                        <Typography variant="body2">{title}</Typography>
                        <Typography variant="caption">{date ? dateFormater(date) : subtitle} </Typography>
                     </Box>
                  </Stack>
                  {(logs ?? data).length - 1 !== index && <VerticalRule pending={pending} />}
               </Box>
            ))}
         </Box>
      </Box>
   );
};

const dateFormater = (timestamp: string) => {
   if (timestamp === 'awaiting response') return timestamp;

   const date: Date = new Date(timestamp);
   const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: '2-digit' };
   const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true };

   return `${date.toLocaleDateString('en-US', options)} [${date.toLocaleTimeString('en-US', timeOptions)}]`;
};
