import { IconButton, Menu } from '@mui/material';
import React, { useState } from 'react';
import { FilterFunnel } from '../icons/FilterFunnel';
import { DateRange, DateRangeProps } from './DateRange';

interface DateFilterProps extends DateRangeProps {}

export const DateFilter = ({ ...props }: DateFilterProps) => {
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

   const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
   };

   return (
      <div>
         <IconButton onClick={handleMenuOpen}>
            <FilterFunnel sx={{ fontSize: 14 }} />
         </IconButton>
         <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            slotProps={{ paper: { style: { padding: '5px' } } }}
         >
            <DateRange {...props} />
         </Menu>
      </div>
   );
};
