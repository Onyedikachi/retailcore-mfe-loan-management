import { Colors } from '@app/constants';
import { KeyboardArrowLeft } from '@mui/icons-material';
import { Box, Typography, styled } from '@mui/material';
import { Fragment } from 'react';
import { BackArrow } from './atoms/BackArrow';

const StyledContainer = styled(Box)({
   backgroundColor: 'white',
   padding: 15,
});

const StyledItemContainer = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   gap: 10,
   textTransform: 'capitalize',
   marginTop: 20,
   marginRight: -10,
});

export interface HeaderProps {
   title: string;
   sudmodules: string[];
   backRoute?: string;
}

export const Header = ({ title, sudmodules, backRoute }: HeaderProps) => {
   return (
      <StyledContainer>
         <Typography
            variant="h4"
            sx={(theme) => ({ fontSize: theme.typography.pxToRem(24), marginLeft: '5px' })}
         >
            {title}
         </Typography>
         <StyledItemContainer>
            <BackArrow route={backRoute} />
            {sudmodules.map((message, index) => (
               <Fragment key={message}>
                  <Typography
                     sx={{
                        textTransform: 'capitalize',
                        ...(index < sudmodules.length - 1 && { color: Colors.LightGray3 }),
                     }}
                  >
                     {message}
                  </Typography>
                  {index !== sudmodules.length - 1 && <KeyboardArrowLeft sx={{ color: Colors.TextGray }} />}
               </Fragment>
            ))}
         </StyledItemContainer>
      </StyledContainer>
   );
};
