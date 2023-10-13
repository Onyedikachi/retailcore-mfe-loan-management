import { IconButton, Menu, MenuItem } from '@mui/material';
import React, { ReactNode, useEffect, useState } from 'react';
import { FilterFunnel } from '../icons/FilterFunnel';
import Checkbox from './Checkbox';

interface FilterMenuProps {
   options: string[];
   onFilterChange: (selectedOptions?: string[] | string) => void;
   checkbox?: boolean;
   filterIcon?: ReactNode;
}

function FilterMenu({ options, onFilterChange, checkbox = true, filterIcon }: FilterMenuProps) {
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
   const [selectedOption, setSelectedOption] = useState<string[] | string>();

   const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
   };

   useEffect(() => {
      !checkbox && onFilterChange(selectedOption);
   }, [selectedOption]);

   const handleMenuClose = () => {
      setAnchorEl(null);
      checkbox && onFilterChange(selectedOption);
   };

   const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const option = event.target.value;
      if (event.target.checked) {
         setSelectedOption((prevSelected) => [...(prevSelected as string[]), option]);
      } else {
         setSelectedOption((prevSelected) =>
            (prevSelected as string[]).filter((selected) => selected !== option)
         );
      }
   };

   return (
      <div>
         <IconButton onClick={handleMenuOpen}>
            {filterIcon ?? <FilterFunnel sx={{ fontSize: 14 }} />}
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
            {options.map((option, index) => {
               return checkbox ? (
                  <MenuItem key={`${option}+${index}`} sx={{ py: 0, height: '30px', fontSize: 14 }}>
                     <>
                        <Checkbox
                           value={option}
                           checked={selectedOption?.includes(option)}
                           onChange={handleCheckboxChange}
                        />
                        {option}
                     </>
                  </MenuItem>
               ) : (
                  <MenuItem
                     key={`${option}+${index}`}
                     sx={{ py: 0, height: '30px', fontSize: 14 }}
                     onClick={() => {
                        setSelectedOption(option);
                        handleMenuClose();
                     }}
                  >
                     {option}
                  </MenuItem>
               );
            })}
         </Menu>
      </div>
   );
}

export default FilterMenu;
