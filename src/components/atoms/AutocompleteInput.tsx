import {
   styled,
   Autocomplete as MuiAutocomplete,
   AutocompleteProps as MuiAutocompleteProps,
   FormControl,
   TextField,
   Stack,
   Typography,
   InputAdornment,
} from '@mui/material';
import { Field, FieldProps, ErrorMessage } from 'formik';
import { InputErrorText } from '../forms/InputFieldError';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import useDebounce from '@app/hooks/useDebounce';

export const StyledAutocomplete = styled(MuiAutocomplete)(() => {
   return {};
});

export interface AutocompleteProps extends MuiAutocompleteProps<any, any, any, any> {
   name: string;
   handleSearch?: (inputValue?: string) => void;
   search?: boolean;

   debounceTime?: number;
   listBoxMaxHeight?: string;
   addButton?: React.ReactNode;
}
interface AutocompleteOptions {
   label: string;
   subtitle?: string;
}
export const Autocomplete: React.FC<AutocompleteProps> = ({
   name,
   search,
   debounceTime = 1000,
   handleSearch,
   listBoxMaxHeight,
   placeholder,
   addButton,
   ...otherProps
}) => {
   const [open, setOpen] = useState(false);
   const { debouncedValue, setDebouncedValue } = useDebounce<string>(debounceTime);

   useEffect(() => {
      handleSearch?.(debouncedValue || '');
   }, [debouncedValue]);

   const handleChange = (event: SyntheticEvent<Element, Event>, newValue: any, form: FieldProps['form']) => {
      form.setFieldValue(name, typeof newValue === 'string' ? newValue : newValue?.label);
   };

   return (
      <Field name={name}>
         {({ form }: FieldProps) => {
            return (
               <>
                  <FormControl fullWidth>
                     <StyledAutocomplete
                        id={name}
                        data-testid={`autocomplete-${name}`}
                        open={open}
                        onOpen={() => {
                           setOpen(true);
                        }}
                        onClose={() => {
                           setOpen(false);
                        }}
                        onInputChange={(event, newValue) => setDebouncedValue(newValue)}
                        onChange={(event, newValue) => handleChange(event, newValue, form)}
                        getOptionLabel={(option) =>
                           typeof option === 'string' ? option : (option as AutocompleteOptions)?.label
                        }
                        renderOption={(props, option) => (
                           <React.Fragment
                              key={
                                 typeof option === 'string' ? option : (option as AutocompleteOptions).label
                              }
                           >
                              {typeof option === 'string' ? (
                                 <li {...props}>{option}</li>
                              ) : (
                                 <Stack component="li" style={{ alignItems: 'flex-start' }} {...props}>
                                    <Typography>{(option as AutocompleteOptions).label}</Typography>
                                    <Typography fontSize={12}>
                                       {(option as AutocompleteOptions).subtitle}
                                    </Typography>
                                 </Stack>
                              )}
                           </React.Fragment>
                        )}
                        ListboxProps={{
                           className: 'fancy-scrollbar',
                           style: { maxHeight: listBoxMaxHeight ?? '250px' },
                        }}
                        ListboxComponent={(componentProps) => (
                           <>
                              {addButton}
                              <ul {...componentProps} />
                           </>
                        )}
                        {...otherProps}
                        renderInput={(params) => {
                           return (
                              <TextField
                                 {...params}
                                 variant="standard"
                                 placeholder={placeholder}
                                 InputProps={{
                                    ...params.InputProps,
                                    endAdornment: <>{params.InputProps.endAdornment}</>,
                                    startAdornment: (
                                       <InputAdornment position="start">
                                          {search && <SearchIcon sx={{ color: 'black', opacity: '0.77' }} />}
                                       </InputAdornment>
                                    ),
                                 }}
                                 error={!!(form.errors[name] && form.touched[name])}
                              />
                           );
                        }}
                     />

                     <ErrorMessage
                        name={name}
                        children={(error: string) => <InputErrorText errorText={error} />}
                     />
                  </FormControl>
               </>
            );
         }}
      </Field>
   );
};
