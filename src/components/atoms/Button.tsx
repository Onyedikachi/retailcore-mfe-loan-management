import { Colors } from '@app/constants';
import { ButtonProps, IconButton, Button as MuiButton, styled } from '@mui/material';
import React from 'react';

const StyledButton = styled(MuiButton)(({ variant, color, disabled }) => ({
   borderRadius: 8,
   padding: '4px 40px',
   textTransform: 'capitalize',
   '&.MuiButton-containedPrimary': {
      background: Colors.Primary,
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

export const BoxShadowIconButton = styled(IconButton)(() => ({
   backgroundColor: Colors.White,
   boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.25)',
   borderRadius: '5px',
   width: 30,
   height: 30,
}));
export const BoxShadowEditIconButton = styled(IconButton)(() => ({
   backgroundColor: Colors.White,
   boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.25)',
   borderRadius: '5px',
   width: 30,
   height: 30,
   display: 'flex',
   alignItems: 'baseline',
   justifyContent: 'flex-start',
}));
