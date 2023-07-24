import { ColorMaps, Colors } from '@app/constants';
import { Chip as MuiChip, styled } from '@mui/material';

export const Chip = styled(MuiChip)(({ variant, color }) => ({
   borderRadius: '5px',
   height: 30,
   ...(variant !== 'outlined' && ColorMaps[color as keyof typeof ColorMaps]),
}));

export const InputChip = styled(MuiChip)(() => ({
   boxShadow: '0 1px 5px rgb(0 0 0 / 0.2)',
   fontSize: '10px',
   height: 'auto',
   marginBottom: '7px',
   borderRadius: '8px',
   background: Colors.Pink,
   '& .MuiChip-label': {
      padding: '0 5px',
   },
}));
