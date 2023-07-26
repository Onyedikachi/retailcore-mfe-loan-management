import { Tooltip as MuiTooltip } from '@mui/material';
import React from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
interface TooltipProps {
   text: React.ReactNode;
}
export const Tooltip: React.FC<TooltipProps> = ({ text }) => {
   return (
      <MuiTooltip arrow placement="top-start" title={text}>
         <InfoOutlinedIcon sx={{ width: '15px', ml: 0.5, fontWeight: '600', cursor: 'pointer' }} />
      </MuiTooltip>
   );
};
