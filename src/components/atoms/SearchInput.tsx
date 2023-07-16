import { InputAdornment, IconButton, TextField, FormControl, TextFieldProps } from '@mui/material';
import { Box } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect } from 'react';
import useDebounce from '@app/hooks/debounce';
export type SearchProps = TextFieldProps & {
   handleSearch: (searchBy: string) => void;
};

const SEARCH_BY = 'searchBy';

export const SearchInput: React.FC<SearchProps> = ({ handleSearch, placeholder }) => {
   const { debouncedValue, setDebouncedValue } = useDebounce<string>(1000);
   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setDebouncedValue(event.target.value);
   };

   useEffect(() => {
      handleSearch(debouncedValue || '');
   }, [debouncedValue]);

   return (
      <Box>
         <FormControl fullWidth>
            <TextField
               variant="standard"
               placeholder={placeholder}
               name={SEARCH_BY}
               type="text"
               onChange={handleChange}
               InputProps={{
                  startAdornment: (
                     <InputAdornment position="start">
                        <IconButton edge="start">
                           <SearchIcon sx={{ color: 'black', opacity: '0.77' }} />
                        </IconButton>
                     </InputAdornment>
                  ),
               }}
            />
         </FormControl>
      </Box>
   );
};
