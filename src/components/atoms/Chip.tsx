import { ColorMaps } from '@app/constants';
import { Chip as MuiChip, styled } from '@mui/material';

export const Chip = styled(MuiChip)(({ variant, color }) => ({
   borderRadius: '5px',
   height: 30,
   ...(variant !== 'outlined' && ColorMaps[color as keyof typeof ColorMaps]),
}));
