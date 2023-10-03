import { Box, styled } from '@mui/material';

export const PaddedBox = styled(Box)(() => ({
   boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.25)',
   borderRadius: '8px',
   padding: '30px',
}));
