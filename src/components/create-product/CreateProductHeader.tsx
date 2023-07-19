import { Colors } from '@app/constants';
import { ArrowBackRounded, KeyboardArrowLeft } from '@mui/icons-material';
import { Box, IconButton, Typography, styled } from '@mui/material';
import { Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';

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
   const { productType = 'Credit', loanType = 'Personal Loan' } = useParams();
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
            {[productType, loanType, 'Product Factory'].map((message, index) => (
               <Fragment key={index}>
                  <Typography sx={{ ...(index < 2 && { color: Colors.LightGray3 }) }}>{message}</Typography>
                  {index !== 2 && <KeyboardArrowLeft sx={{ color: Colors.TextGray }} />}
               </Fragment>
            ))}
         </StyledItemContainer>
      </StyledContainer>
   );
};
