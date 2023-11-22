import {
   styled,
   Autocomplete as MuiAutocomplete,
   AutocompleteProps as MuiAutocompleteProps,
   FormControl,
   TextField,
   Stack,
   Typography,
   InputAdornment,
   Box,
} from '@mui/material';
import { Field, FieldProps, ErrorMessage } from 'formik';
import { InputErrorText } from '../../forms/InputFieldError';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import useDebounce from '@app/hooks/useDebounce';
import Checkbox from '../Checkbox';
import { Listbox } from './Listbox';

export const StyledAutocomplete = styled(MuiAutocomplete)(() => {
   return {};
});

const defaultFilterOption = (options: unknown, { inputValue }: { inputValue: string }) => {
   const value = inputValue.toLowerCase().trim();
   return (options as (string | AutocompleteOptions)[]).filter((option) => {
      if (typeof option === 'string') {
         return option.toLowerCase().includes(value);
      } else {
         const label = option.label.toLowerCase();
         const subtitle = option.subtitle?.toLowerCase() ?? '';
         return label.includes(value) || subtitle.includes(value);
      }
   });
};

export interface AutocompleteProps extends MuiAutocompleteProps<any, any, any, any> {
   name: string;
   handleSearch?: (inputValue?: string) => void;
   search?: boolean;

   debounceTime?: number;
   listBoxMaxHeight?: string;
   addButton?: React.ReactNode;
   applyButton?: React.ReactNode;
   checkbox?: boolean;
   extras?: React.ReactNode;
   onInputChange?: (newValue: unknown) => void;
   filterOptions?: (
      options: unknown,
      { inputValue }: { inputValue: string }
   ) => (string | AutocompleteOptions)[];
}
export interface AutocompleteOptions {
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
   checkbox,
   applyButton,
   extras,
   filterOptions = defaultFilterOption,
   onInputChange,
   ...otherProps
}) => {
   const [open, setOpen] = useState(false);
   const { debouncedValue, setDebouncedValue } = useDebounce<string>(debounceTime);

   useEffect(() => {
      handleSearch?.(debouncedValue ?? '');
   }, [debouncedValue]);

   const handleChange = (event: SyntheticEvent<Element, Event>, newValue: any, form: FieldProps['form']) => {
      if (otherProps.multiple) {
         const value = newValue.map((prop: AutocompleteOptions) => prop.label);
         form.setFieldValue(name, typeof newValue === 'string' ? newValue : value);
      } else {
         form.setFieldValue(name, typeof newValue === 'string' ? newValue : newValue?.label);
      }
      onInputChange?.(newValue);
   };

   const renderListComponent = (componentProps: React.HTMLAttributes<HTMLElement>) => {
      return <Listbox addButton={addButton} applyButton={applyButton} componentProps={componentProps} />;
   };

   return (
      <Field name={name}>
         {({ form, field }: FieldProps) => {
            return (
               <>
                  <FormControl fullWidth>
                     <StyledAutocomplete
                        id={name}
                        data-testid={`autocomplete-${name}`}
                        open={open}
                        onOpen={() => setOpen(true)}
                        onClose={() => setOpen(false)}
                        onInputChange={(event, newValue) => setDebouncedValue(newValue)}
                        onChange={(event, newValue) => handleChange(event, newValue, form)}
                        getOptionLabel={getOption}
                        filterOptions={filterOptions}
                        value={field.value}
                        isOptionEqualToValue={(option, value) => {
                           return typeof option === 'string'
                              ? option == value
                              : (option as AutocompleteOptions)?.label == value;
                        }}
                        renderOption={(props, option, { selected }) => {
                           return (
                              <React.Fragment key={getOption(option)}>
                                 {(option as AutocompleteOptions)?.subtitle ? (
                                    <Stack component="li" style={{ alignItems: 'flex-start' }} {...props}>
                                       <Typography>{getOption(option)}</Typography>
                                       <Typography fontSize={12}>
                                          {(option as AutocompleteOptions)?.subtitle}
                                       </Typography>
                                    </Stack>
                                 ) : (
                                    <Box component="li" {...props} sx={{ py: 0 }}>
                                       {checkbox && <Checkbox sx={{ mr: 2, py: 0 }} checked={selected} />}
                                       {getOption(option)} {extras ?? ''}
                                    </Box>
                                 )}
                              </React.Fragment>
                           );
                        }}
                        ListboxProps={{
                           className: 'fancy-scrollbar',
                           style: { maxHeight: listBoxMaxHeight ?? '250px', fontSize: '14px' },
                        }}
                        ListboxComponent={renderListComponent}
                        {...otherProps}
                        renderTags={(list) => {
                           const lists = list?.map((item: any) => item.label).join(', ');
                           return <span>{lists}</span>;
                        }}
                        renderInput={(params) => {
                           const { startAdornment, endAdornment } = params.InputProps;
                           return (
                              <TextField
                                 {...params}
                                 variant="standard"
                                 placeholder={placeholder}
                                 InputProps={{
                                    ...params.InputProps,
                                    endAdornment: [
                                       ...(Array.isArray(endAdornment) ? endAdornment : [endAdornment]),
                                       <>{params.InputProps.endAdornment}</>,
                                    ],
                                    startAdornment: (
                                       <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                                          {search && (
                                             <InputAdornment position="start">
                                                <SearchIcon sx={{ color: 'black', opacity: '0.77' }} />
                                             </InputAdornment>
                                          )}
                                          <span>{startAdornment}</span>
                                       </Box>
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

const getOption = (option: unknown): string => {
   return typeof option === 'string' ? option : (option as AutocompleteOptions)?.label;
};
