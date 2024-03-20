import React from 'react';
import { Box, Divider, Typography, styled, Stack } from '@mui/material';
import { Colors } from '@app/constants/colors';

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

const RoundedBullet = styled('div')<{ pending: boolean }>(({ pending }) => ({
   position: 'relative',
   height: 25,
   width: 25,
   borderRadius: '50%',
   border: `1.5px solid ${pending ? Colors.LightGray5 : Colors.Success}`,
   background: `${pending ? 'transparent' : Colors.Success}`,
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   '&:before': {
      content: '""',
      position: 'absolute',
      border: `0.5px solid ${pending ? Colors.LightGray5 : Colors.Success}`,
      background: `${pending ? 'transparent' : 'white'}`,
      height: 17,
      width: 17,
      borderRadius: '50%',
   },
}));

export const ActivityLog: React.FC<ActivityLogProps> = ({ logs, title = 'ACTIVITY LOG' }) => {
   const data: Array<Log> = [
      { pending: true, subtitle: 'Verify and Submit request for processing', title: 'Pending Activity' },
   ];

   // Sort logs by date in chronological order
   const sortedLogs = (logs ?? data)
      .slice()
      .sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime());

   return (
      <Box sx={{ px: '12px' }}>
         <Typography variant="h5" mb={0.5}>
            {title}
         </Typography>
         <Divider />
         {!logs && <Typography sx={{ my: 2, fontSize: 12, fontWeight: 400 }}>No activities found</Typography>}
         <Box sx={{ marginTop: '23px' }}>
            {sortedLogs.map(({ pending, title, subtitle, date }, index) => (
               <Box key={title}>
                  <Stack direction="row" alignItems="center" columnGap="12px">
                     <Box>
                        <RoundedBullet pending={pending} />
                     </Box>
                     <Box flex={1}>
                        <Typography variant="body2">{title}</Typography>
                        {subtitle && (
                           <Typography variant="caption" display="block">
                              {subtitle}
                           </Typography>
                        )}
                        {date && <Typography variant="caption">{dateFormatter(date)} </Typography>}
                     </Box>
                  </Stack>
                  {sortedLogs.length - 1 !== index && <VerticalRule pending={pending} />}
               </Box>
            ))}
         </Box>
      </Box>
   );
};

export const dateFormatter = (timestamp: string) => {
   if (timestamp === 'awaiting response') return timestamp;

   const date: Date = new Date(timestamp);
   const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: '2-digit' };
   const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: true };

   return `${date.toLocaleDateString('en-US', options)} [${date.toLocaleTimeString('en-US', timeOptions)}]`;
};
