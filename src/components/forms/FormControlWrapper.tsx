import { Box, Grid, InputLabel, InputLabelProps, Typography } from '@mui/material';
import React from 'react';
import InfoTooltip from '../atoms/Tooltip';
import { Colors } from '@app/constants';
import RequiredIndicator from '../atoms/RequiredIndicator';

interface WrapperProps extends InputLabelProps {
   name: string;
   label?: string;
   labelDescription?: string;
   children: React.ReactNode;
   tooltipText?: string;
   layout?: 'vertical' | 'horizontal';
}

const FormControlWrapper: React.FC<WrapperProps> = (props) => {
   return (
      <Grid container alignItems="end" sx={{ ...props.sx }}>
         {props.label && (
            <Grid item xs={props.layout == 'vertical' ? 6 : 12}>
               <Box display="flex">
                  <InputLabel htmlFor={props.name} sx={{ fontWeight: '500' }}>
                     {props.label}
                  </InputLabel>
                  {props.required && <RequiredIndicator />}
                  {props.tooltipText && <InfoTooltip text={props.tooltipText} />}
               </Box>
               {props.labelDescription && (
                  <Typography sx={{ fontSize: '14px', color: Colors.LightGray }}>
                     {props.labelDescription}
                  </Typography>
               )}
            </Grid>
         )}
         <Grid item xs={props.layout == 'vertical' ? 6 : 12}>
            {props.children}
         </Grid>
      </Grid>
   );
};
export default FormControlWrapper;
