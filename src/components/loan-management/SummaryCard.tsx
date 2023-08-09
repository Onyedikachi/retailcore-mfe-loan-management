import { Avatar, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

import { Naira } from '../icons/Naira';
import { Colors } from '@app/constants/colors';
import { BoxProps } from '@mui/system';

interface SummaryCardProps extends BoxProps {
   title: string;
   value: string;
   type: 'number' | 'value';
   summaryType: keyof typeof summaryTypes;
}
export const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, type, summaryType }) => {
   const { iconColor, iconBgcolor } = summaryTypes[summaryType];
   return (
      <Box
         sx={{
            borderRadius: '5px',
            p: 2.5,
            display: 'flex',
            alignItems: 'center',
            maxWidth: '300px',
            boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)',
         }}
      >
         <Avatar sx={{ bgcolor: iconBgcolor, p: 0 }}>
            {type == 'value' ? <Naira sx={{ color: iconColor }} /> : <PersonIcon sx={{ color: iconColor }} />}
         </Avatar>

         <Box ml={1}>
            <Box fontSize={14}> {title} </Box>
            <Box sx={{ fontSize: '24px', fontWeight: 'bold' }}> {value} </Box>
         </Box>
      </Box>
   );
};

const summaryTypes = {
   loanDisbursed: { iconColor: Colors.DarkGreen, iconBgcolor: Colors.BgCardSuccess },
   performingLoan: { iconColor: '#806B00', iconBgcolor: '#FFF8CC' },
   nonPerformingLoan: { iconColor: Colors.DarKRed, iconBgcolor: Colors.BgCardRed },
};
