import { ClickAwayListener, Tooltip } from '@mui/material';
import React from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
interface TooltipProps {
   text: React.ReactNode;
}
const InfoTooltip: React.FC<TooltipProps> = ({ text }) => {
   const [open, setOpen] = React.useState(false);

   return (
      <ClickAwayListener onClickAway={() => setOpen(false)}>
         <Tooltip
            arrow
            PopperProps={{
               disablePortal: true,
            }}
            placement="top-start"
            onClose={() => setOpen(false)}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={text}
         >
            <InfoOutlinedIcon
               sx={{ width: '15px', ml: 0.5, fontWeight: '600', cursor: 'pointer' }}
               onClick={() => setOpen(!open)}
            />
         </Tooltip>
      </ClickAwayListener>
   );
};

export default InfoTooltip;
