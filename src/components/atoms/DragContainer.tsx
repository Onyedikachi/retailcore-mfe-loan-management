import styled from '@emotion/styled';
import { Drag } from '../icons/Drag';
import { Box } from '@mui/material';

const StyledComponent = styled(Box)(() => ({
   boxShadow: '0 1px 2px 0 rgba(91, 104, 113, 0.32)',
   borderRadius: '5px',
   fontSize: '14px',
   display: 'flex',
   padding: 4,
   alignItems: 'center',
   cursor: 'pointer',
   marginBottom: '8px',
   width: '100%',
}));

const DragContainer: React.FC<{ text: string }> = ({ text }) => {
   return (
      <StyledComponent>
         <Drag sx={{ fontSize: '1rem', marginRight: 1 }} />
         {text}
      </StyledComponent>
   );
};

export default DragContainer;
