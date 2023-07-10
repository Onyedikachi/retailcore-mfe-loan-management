import { ButtonProps, Button as MuiButton } from '@mui/material';
import React from 'react';

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
   ({ variant, color, ...restProp }, ref) => {
      color = color ?? ((variant === 'outlined' ? 'grey' : undefined) as any);
      return <MuiButton color={color} variant={variant} ref={ref} {...restProp} />;
   }
);
