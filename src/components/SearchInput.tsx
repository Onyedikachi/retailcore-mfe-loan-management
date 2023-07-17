import { InputAdornment, IconButton, TextField, FormControl } from '@mui/material';
import { Box } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect } from 'react';
import useDebounce from '@app/hooks/debounce';
interface SearchProps {
   handleSearch: (searchBy: string) => void;
   width?: string;
   borderRadius?: string;
}

const SEARCH_BY = 'searchBy';

export const SearchInput: React.FC<SearchProps> = ({ handleSearch, width, borderRadius }) => {
   const { debouncedValue, setDebouncedValue } = useDebounce<string>(1000);
   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setDebouncedValue(event.target.value);
   };

   useEffect(() => {
      handleSearch(debouncedValue || '');
   }, [debouncedValue]);

   return (
      <Box
         sx={{
            width: width ?? '300px',
            '& input ': { p: '5px', pl: 0 },
         }}
      >
         <FormControl
            fullWidth
            sx={{
               '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: 'black' },
                  borderRadius: borderRadius ?? '5px',
                  '& ::placeholder': { fontSize: '14px' },
               },
            }}
         >
            <TextField
               placeholder="Search"
               name={SEARCH_BY}
               type="text"
               onChange={handleChange}
               InputProps={{
                  startAdornment: (
                     <InputAdornment position="start">
                        <IconButton edge="start">
                           <SearchIcon sx={{ color: 'black' }} />
                        </IconButton>
                     </InputAdornment>
                  ),
               }}
            />
         </FormControl>
      </Box>
   );
};
