import { Colors } from '@app/constants';
import { ButtonProps, Button as MuiButton, styled } from '@mui/material';
import React from 'react';

const StyledButton = styled(MuiButton)(({ variant, color, disabled }) => ({
   borderRadius: 8,
   padding: '5px 40px',
   ...(variant === 'contained' &&
      color === 'primary' && {
         background: Colors.LinearGradient,
         color: Colors.LightGray2,
      }),
   ...(variant === 'contained' &&
      color === 'primary' &&
      disabled && {
         backgroundColor: Colors.LightGray,
         color: Colors.White,
         border: `1px solid ${Colors.LightGray1}`,
      }),
   ...(variant === 'outlined' &&
      (color as string) === 'grey' &&
      disabled && {
         color: Colors.TextGray,
         border: `1px solid ${Colors.LightGray1}`,
      }),
}));

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
   ({ variant, color, ...restProp }, ref) => {
      color = color ?? ((variant === 'outlined' ? 'grey' : undefined) as any);
      return (
         <StyledButton color={color ?? 'primary'} variant={variant ?? 'contained'} ref={ref} {...restProp} />
      );
   }
);
