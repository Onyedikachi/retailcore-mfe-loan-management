import { ButtonGroup, InputAdornment } from '@mui/material';
import { Button } from '../atoms';
import { FormControlBase } from './FormControl';
import FormControlWrapper from './FormControlWrapper';
import { Colors } from '@app/constants/colors';
import React from 'react';
import { useFormikHelper } from '@app/hooks/useFormikHelper';

export interface CurrencyPercentageControlProps {
   name: string;
   required?: boolean;
   label?: string;
   tooltipText?: string;
   placeholder?: string;
   withChip?: boolean;
   layout?: 'horizontal' | 'vertical';
   labelDescription?: string;
   mb?: number;
}

export const CurrencyPercentageControl = (props: CurrencyPercentageControlProps) => {
   const [inputType, setInputType] = React.useState('currency');
   const { resetFieldState } = useFormikHelper();
   return (
      <FormControlWrapper
         sx={{ mb: props.mb, alignItems: 'center' }}
         labelDescription={props.labelDescription}
         name={props.name}
         label={props.label}
         layout={props.layout}
         required={props.required ?? true}
         tooltipText={props.tooltipText}
      >
         <FormControlBase
            name={props.name}
            control="input"
            percentage={inputType == 'percent'}
            currency={inputType == 'currency'}
            placeholder={props.placeholder ?? '0'}
            InputProps={{
               endAdornment: (
                  <InputAdornment position="end">
                     <ButtonGroup sx={{ mb: 1 }}>
                        {['currency', 'percent'].map((value, index) => (
                           <Button
                              key={value}
                              variant="outlined"
                              sx={{
                                 background: inputType == value ? Colors.Pink : '',
                                 '&:hover': {
                                    background: inputType == value ? Colors.Pink : '',
                                    borderColor: '#E5E9EB',
                                 },
                                 py: 0,
                                 px: 1,
                                 borderTopLeftRadius: index == 0 ? '10px' : 0,
                                 bordeBottomLeftRadius: index == 0 ? '10px' : 0,
                                 borderTopRightRadius: index == 1 ? '10px' : 0,
                                 bordeBottomRightRadius: index == 1 ? '10px' : 0,
                                 fontSize: 11,
                                 borderColor: '#E5E9EB',
                              }}
                              onClick={() => {
                                 setInputType(value);
                                 resetFieldState(props.name);
                              }}
                           >
                              {index == 0 ? 'NGN' : value}
                           </Button>
                        ))}
                     </ButtonGroup>
                  </InputAdornment>
               ),
            }}
         />
      </FormControlWrapper>
   );
};
