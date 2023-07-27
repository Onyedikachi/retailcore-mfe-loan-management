import { Colors, RoutePaths } from '@app/constants';
import { ArrowBackRounded, KeyboardArrowLeft } from '@mui/icons-material';
import { Box, IconButton, Typography, styled } from '@mui/material';
import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';

const StyledContainer = styled(Box)({
   backgroundColor: 'white',
   padding: 15,
});

const StyledItemContainer = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   gap: 10,
   textTransform: 'capitalize',
   marginTop: 15,
   marginRight: -10,
});

export interface CreateProductHeaderProps {
   title: string;
}

export const CreateProductHeader = () => {
   const { pathname } = useLocation();
   const applicationPathName = Object.values(RoutePaths).find(({ absolute }) => absolute === pathname)?.name;

   return (
      <StyledContainer>
         <Typography
            variant="h4"
            sx={(theme) => ({ fontSize: theme.typography.pxToRem(24), marginLeft: '5px' })}
         >
            CREATE NEW PRODUCT
         </Typography>
         <StyledItemContainer>
            <Link to={'#'} style={{ textDecoration: 'unset' }}>
               <IconButton sx={{ padding: 0 }}>
                  <ArrowBackRounded></ArrowBackRounded>
               </IconButton>
            </Link>
            {['Credit', applicationPathName ?? '', 'Product Factory'].map((message, index) => (
               <Fragment key={index}>
                  <Typography
                     sx={{ textTransform: 'capitalize', ...(index < 2 && { color: Colors.LightGray3 }) }}
                  >
                     {message.toLowerCase()}
                  </Typography>
                  {index !== 2 && <KeyboardArrowLeft sx={{ color: Colors.TextGray }} />}
               </Fragment>
            ))}
         </StyledItemContainer>
      </StyledContainer>
   );
};
