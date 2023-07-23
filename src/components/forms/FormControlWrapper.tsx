import { Box, InputLabel, InputLabelProps, SxProps, Theme, Typography } from '@mui/material';
import React from 'react';
import { Colors } from '@app/constants';
import RequiredIndicator from '../atoms/RequiredIndicator';
import { Tooltip } from '../atoms';

interface WrapperProps extends InputLabelProps {
   name: string;
   label?: React.ReactNode;
   labelDescription?: string;
   children: React.ReactNode;
   tooltipText?: string;
   layout?: 'vertical' | 'horizontal';
   layoutStyles?: SxProps<Theme>;
}

const FormControlWrapper: React.FC<WrapperProps> = (props) => {
   const flexStyles =
      props.layout == 'horizontal' ? { display: 'flex', alignItems: 'center', ...props.layoutStyles } : {};
   return (
      <Box sx={{ mb: 4, ...props.sx, ...flexStyles }}>
         {props.label && (
            <Box>
               <Box display="flex">
                  <InputLabel htmlFor={props.name} sx={{ fontWeight: '500' }}>
                     {props.label}
                  </InputLabel>
                  {props.required && <RequiredIndicator />}
                  {props.tooltipText && <Tooltip text={props.tooltipText} />}
               </Box>
               {props.labelDescription && (
                  <Typography sx={{ fontSize: '14px', color: Colors.LightGray }}>
                     {props.labelDescription}
                  </Typography>
               )}
            </Box>
         )}
         <Box>{props.children}</Box>
      </Box>
   );
};
export default FormControlWrapper;
