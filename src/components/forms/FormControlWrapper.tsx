import { Box, Grid, InputLabel, InputLabelProps, Typography } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import React from 'react';
import InfoTooltip from '../atoms/Tooltip';
import { Colors } from '@app/constants';

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
      <Grid container alignItems="end">
         {props.label && (
            <Grid item xs={props.layout == 'vertical' ? 6 : 12}>
               <Box display="flex">
                  <InputLabel htmlFor={props.name} sx={{ fontWeight: '500' }}>
                     {props.label}
                  </InputLabel>
                  {props.required && (
                     <FiberManualRecordIcon
                        sx={{ color: 'primary.main', width: '8px', height: '10px', ml: 0.2 }}
                     />
                  )}
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
