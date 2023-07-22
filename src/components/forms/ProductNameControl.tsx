import { InputAdornment, Typography } from '@mui/material';
import { FormControlBase } from './FormControl';
import FormControlWrapper from './FormControlWrapper';
import { Colors, CommonFormFieldNames, CommonTooltipText } from '@app/constants';
import { InputProps } from '../atoms';
import { InputErrorText } from './InputFieldError';

export type ProductNameProps = Partial<InputProps> & {
   name?: string;
   required?: boolean;
   label?: string;
   tooltipText?: string;
   placeholder?: string;
   maxTextLength?: number;
   availableMessage?: string;
   isAvailable?: boolean;
};

export const ProductNameControl = ({
   name,
   required,
   label,
   tooltipText,
   placeholder,
   maxTextLength,
   availableMessage,
   isAvailable,
   ...otherProps
}: ProductNameProps) => {
   return (
      <FormControlWrapper
         name={name ?? CommonFormFieldNames.PRODUCT_NAME}
         label={label ?? 'Product Name'}
         required={required ?? true}
         tooltipText={tooltipText ?? CommonTooltipText.PRODUCT_NAME}
      >
         <FormControlBase
            name={name ?? CommonFormFieldNames.PRODUCT_NAME}
            control="input"
            placeholder={placeholder ?? 'Enter the product name'}
            InputProps={{
               ...(maxTextLength && {
                  endAdornment: (
                     <InputAdornment position="end">
                        <Typography color={Colors.LightGray3}>0/50</Typography>
                     </InputAdornment>
                  ),
               }),
            }}
            {...(otherProps as any)}
         />
         {isAvailable === false && <InputErrorText errorText={availableMessage ?? ''} />}
      </FormControlWrapper>
   );
};
