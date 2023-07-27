import { Box, CircularProgress, styled } from '@mui/material';

const StyledLoaderWrapper = styled(Box)({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   width: '100%',
   height: '100%',
   position: 'fixed',
   top: 0,
   left: 0,
   zIndex: 999,
   backgroundColor: 'rgba(255, 255, 255, 0.2)',
});

export const Loader = () => {
   return (
      <StyledLoaderWrapper>
         <CircularProgress size={50} thickness={5} value={60} color="primary" />
      </StyledLoaderWrapper>
   );
};
