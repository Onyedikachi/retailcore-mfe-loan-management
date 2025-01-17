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
import useDebounce from '@app/hooks/useDebounce';

interface FilterMenuProps {
   options: any[];
   icon?: boolean;
   onFilterChange: (selectedOptions?: string[] | string) => void;
   checkbox?: boolean;
   filterIcon?: ReactNode;
}

function FilterMenu({ options, onFilterChange, checkbox = true, filterIcon, icon }: FilterMenuProps) {
   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
   const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
   const [checkedOptions, setCheckedOptions] = useState<string[]>([]);
   const { debouncedValue, setDebouncedValue } = useDebounce(2000);

   useEffect(() => {
      onFilterChange(selectedOptions);
   }, [debouncedValue, onFilterChange]);

   const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
   };

   const handleMenuClose = () => {
      setAnchorEl(null);
   };

   const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value: option, checked } = event.target ?? {};

      if (option?.toLowerCase() === 'all') {
         if (!checked) {
            setSelectedOptions([]);
            setCheckedOptions([]);
         } else {
            const filteredOptions = options.filter((option) => option.toLowerCase() !== 'all');
            setCheckedOptions(options);
            setSelectedOptions(filteredOptions);
         }
      } else {
         if (selectedOptions?.includes(option)) {
            const filteredOption = selectedOptions?.filter((item) => item !== option);
            setCheckedOptions(filteredOption);
            setSelectedOptions(filteredOption);
         } else {
            setSelectedOptions([...selectedOptions, option]);
            setCheckedOptions([...selectedOptions, option]);
         }
      }

      setDebouncedValue(selectedOptions);
   };

   useEffect(() => {
      const allOptionsChecked = options?.slice(1)?.every((option) => selectedOptions?.includes(option));

      if (allOptionsChecked) {
         setCheckedOptions([...checkedOptions, 'All']);
      }
   }, [selectedOptions]);

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
                           checked={checkedOptions.includes(option)}
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
                        setSelectedOptions(option);
                        setDebouncedValue(option);
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
      case 'Close Loan':
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
