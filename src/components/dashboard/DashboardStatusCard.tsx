import { StatusCardProps } from '@app/@types/dashboard';
import { Colors } from '@app/constants';
import { Stack, Typography, styled } from '@mui/material';

const StatusCardWrapper = styled(Stack)(({ theme }) => ({
   borderRadius: 8,
   padding: theme.spacing(0.7, 1.3),
   cursor: 'pointer',
   border: '1px solid transparent',
   width: 90,
   minWidth: 'fit-content',
   '&:hover': {
      borderColor: Colors.BorderGray1,
   },
}));

export const StatusCard = ({ label, value, isActive, variant, onClick }: StatusCardProps) => {
   return (
      <StatusCardWrapper bgcolor={isActive ? Colors.BgCardGray : 'white'} onClick={onClick}>
         <Typography
            variant="h3"
            fontSize="14px"
            color={label.includes('Non') ? '#D4A62F' : `${variant}.main` ?? 'black'}
            lineHeight="24px"
            fontWeight={isActive ? 600 : 400}
         >
            {label}
         </Typography>
         <Typography variant="h2" color="black">
            {value}
         </Typography>
      </StatusCardWrapper>
   );
};
