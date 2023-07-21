import { InputAdornment, Typography } from '@mui/material';
import { FormControlBase } from './FormControl';
import FormControlWrapper from './FormControlWrapper';
import { Colors, CommonFormFieldNames, CommonTooltipText } from '@app/constants';

export interface ProductNameProps {
   name?: string;
   required?: boolean;
   label?: string;
   tooltipText?: string;
   placeholder?: string;
   maxTextLength?: number;
}

export const ProductNameControl = (props: ProductNameProps) => {
   return (
      <FormControlWrapper
         name={props.name ?? CommonFormFieldNames.PRODUCT_NAME}
         label={props.label ?? 'Product Name'}
         required={props.required ?? true}
         tooltipText={props.tooltipText ?? CommonTooltipText.PRODUCT_NAME}
      >
         <FormControlBase
            name={props.name ?? CommonFormFieldNames.PRODUCT_NAME}
            control="input"
            placeholder={props.placeholder ?? 'Enter the product name'}
            InputProps={{
               ...(props.maxTextLength && {
                  endAdornment: (
                     <InputAdornment position="end">
                        <Typography color={Colors.LightGray3}>0/50</Typography>
                     </InputAdornment>
                  ),
               }),
            }}
         />
      </FormControlWrapper>
   );
};
