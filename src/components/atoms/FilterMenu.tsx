import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import React, { ReactNode, useEffect, useState } from 'react';
import { FilterFunnel } from '../icons/FilterFunnel';
import Checkbox from './Checkbox';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import BlockIcon from '@mui/icons-material/Block';
import { WriteOff } from '@app/components/icons/WriteOff';
import { Modify } from '@app/components/icons/Modify';
import { Delete } from '@app/components/icons/Delete';

interface FilterMenuProps {
   options: string[];
   icon?: boolean;
   onFilterChange: (selectedOptions?: string[] | string) => void;
   checkbox?: boolean;
   filterIcon?: ReactNode;
}

function FilterMenu({ options, onFilterChange, checkbox = true, filterIcon, icon }: FilterMenuProps) {
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
         setSelectedOption((prevSelected) => [...(prevSelected ? (prevSelected as string[]) : []), option]);
      } else {
         setSelectedOption((prevSelected) =>
            (prevSelected as string[])?.filter((selected) => selected !== option)
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
            {options?.map((option, index) => {
               return checkbox ? (
                  <MenuItem key={`${option}+${index * 2}`} sx={{ py: 0, height: '30px', fontSize: 14 }}>
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
                     key={`${option}+${index * 2}`}
                     sx={{ py: 0, height: '30px', fontSize: 14 }}
                     onClick={() => {
                        setSelectedOption(option);
                        handleMenuClose();
                     }}
                  >
                     {icon && (
                        <Typography sx={{ pr: 1.2, display: 'flex', alignItems: 'center' }}>
                           {menuIcons(option)}
                        </Typography>
                     )}
                     {option}
                  </MenuItem>
               );
            })}
         </Menu>
      </div>
   );
}

export default FilterMenu;

const menuIcons = (option: string) => {
   switch (option) {
      case 'View':
         return <VisibilityIcon sx={{ color: 'info.main', fontSize: '20px' }} />;
      case 'Liquidate Loan':
         return <BlockIcon sx={{ color: 'primary.main', fontSize: '18px' }} />;
      case 'Close Loan Account':
         return <HighlightOffIcon sx={{ fontSize: '18px' }} />;
      case 'Write-Off Loan':
         return <WriteOff sx={{ fontSize: '18px' }} />;
      case 'Withdraw & Modify':
      case 'Modify':
      case 'Restructure Loan':
      case 'Continue Request':
         return <Modify sx={{ fontSize: '18px' }} />;
      case 'Delete Request':
      case 'Withdraw & Delete Request':
         return <Delete sx={{ fontSize: '18px' }} />;
      default:
         return;
   }
};
