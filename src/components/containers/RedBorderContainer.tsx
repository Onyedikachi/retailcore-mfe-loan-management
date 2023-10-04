import { Colors } from '@app/constants/colors';
import { Box, styled } from '@mui/material';

export const RedBorderContainer = styled(Box)({
   marginBottom: '12px',
   border: `1px solid ${Colors.Primary}`,
   borderRadius: '5px',
   minHeight: '120px',
   padding: '12px 10px 0px 12px',
});
