import { Colors } from '@app/constants';
import { ButtonProps, Button as MuiButton, styled } from '@mui/material';
import React from 'react';

const StyledButton = styled(MuiButton)(({ variant, color, disabled }) => ({
   borderRadius: 8,
   padding: '5px 40px',
   textTransform: 'capitalize',
   '&.MuiButton-containedPrimary': {
      background: Colors.LinearGradient,
      color: Colors.LightGray2,
   },
   '&.Mui-disabled.MuiButton-containedPrimary': {
      background: Colors.LightGray,
      color: Colors.White,
      border: `1px solid ${Colors.LightGray1}`,
   },
   ...(variant === 'outlined' &&
      (color as string) === 'gray' &&
      disabled && {
         color: Colors.TextGray,
         border: `1px solid ${Colors.LightGray1}`,
      }),
}));

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
   ({ variant, color, ...restProp }, ref) => {
      color = color ?? ((variant === 'outlined' ? 'gray' : undefined) as any);
      return <StyledButton color={color} variant={variant ?? 'contained'} ref={ref} {...restProp} />;
   }
);
