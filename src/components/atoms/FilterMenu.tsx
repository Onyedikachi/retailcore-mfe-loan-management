import { IconButton, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { FilterFunnel } from '../icons/FilterFunnel';
import Checkbox from './Checkbox';

interface FilterMenuProps {
   options: string[];
   onFilterChange: (selectedOptions: string[]) => void;
}

function FilterMenu({ options, onFilterChange }: FilterMenuProps) {
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
   const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

   const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
   };

   const handleMenuClose = () => {
      setAnchorEl(null);
      onFilterChange(selectedOptions);
   };

   const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const option = event.target.value;
      if (event.target.checked) {
         setSelectedOptions((prevSelected) => [...prevSelected, option]);
      } else {
         setSelectedOptions((prevSelected) => prevSelected.filter((selected) => selected !== option));
      }
   };

   return (
      <div>
         <IconButton onClick={handleMenuOpen}>
            <FilterFunnel sx={{ fontSize: 14 }} />
         </IconButton>
         <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            slotProps={{
               paper: {
                  style: { minWidth: '150px', maxHeight: '200px', overflowY: 'auto' },
                  className: 'fancy-scrollbar',
               },
            }}
         >
            {options.map((option, index) => (
               <MenuItem key={`${option}+${index}`} sx={{ py: 0, height: '30px', fontSize: 14 }}>
                  <Checkbox
                     value={option}
                     checked={selectedOptions.includes(option)}
                     onChange={handleCheckboxChange}
                  />
                  {option}
               </MenuItem>
            ))}
         </Menu>
      </div>
   );
}

export default FilterMenu;
