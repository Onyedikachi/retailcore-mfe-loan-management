import { Colors } from '@app/constants';
import styled from '@emotion/styled';
import { Box } from '@mui/system';

export const DocumentFormatContainer = styled(Box)(() => ({
   border: `1px solid ${Colors.Primary}`,
   padding: '10px',
   display: 'flex',
   borderRadius: '6px',
}));

export const DocumentFormat = styled(Box)(() => ({
   border: `1px solid ${Colors.LightGray}`,
   padding: '5px',
   marginRight: '5px',
   borderRadius: '14px',
   fontSize: '12px',
   display: 'flex',
   alignItems: 'center',
}));
