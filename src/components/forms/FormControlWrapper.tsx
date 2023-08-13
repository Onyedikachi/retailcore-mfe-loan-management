import { Box, Grid, InputLabel, InputLabelProps, SxProps, Theme, Typography } from '@mui/material';
import React from 'react';
import { Colors } from '@app/constants';
import { StatusIndicator } from '../atoms/StatusIndicator';
import { Tooltip } from '../atoms';

export interface WrapperProps extends InputLabelProps {
   name: string;
   label?: React.ReactNode;
   labelDescription?: string;
   children: React.ReactNode;
   tooltipText?: string;
   layout?: 'vertical' | 'horizontal';
   layoutFlexGrid?: number[];
   layoutStyles?: SxProps<Theme>;
}

const FormControlWrapper: React.FC<WrapperProps> = (props) => {
   return (
      <Grid container sx={{ mb: 4, ...props.sx }}>
         {props.label && (
            <Grid item xs={props.layout == 'horizontal' ? props.layoutFlexGrid?.[0] ?? 4 : 12}>
               <Box display="flex">
                  <InputLabel htmlFor={props.name} sx={{ fontWeight: '500', whiteSpace: 'normal' }}>
                     {props.label}
                  </InputLabel>
                  {props.required && <StatusIndicator />}
                  {props.tooltipText && <Tooltip text={props.tooltipText} />}
               </Box>
               {props.labelDescription && (
                  <Typography sx={{ fontSize: '14px', color: Colors.LightGray }}>
                     {props.labelDescription}
                  </Typography>
               )}
            </Grid>
         )}
         <Grid item xs={props.layout == 'horizontal' ? props.layoutFlexGrid?.[1] ?? 8 : 12} pl={2}>
            {props.children}
         </Grid>
      </Grid>
   );
};
export default FormControlWrapper;
