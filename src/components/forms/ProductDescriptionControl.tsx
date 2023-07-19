import { CommonFormFieldNames, CommonTooltipText } from '@app/constants';
import { FormControlBase } from './FormControl';
import FormControlWrapper from './FormControlWrapper';

export interface ProductDescriptionControlProps {
   name?: string;
   required?: boolean;
   label?: string;
   tooltipText?: string;
   placeholder?: string;
}

export const ProductDescriptionControl = (props: ProductDescriptionControlProps) => {
   return (
      <FormControlWrapper
         name={props.name ?? CommonFormFieldNames.DESCRIPTION}
         label={props.label ?? 'Description'}
         required={props.required ?? true}
         tooltipText={props.tooltipText ?? CommonTooltipText.DESCRIPTION}
      >
         <FormControlBase
            control="input"
            multiline
            rows={4}
            variant="outlined"
            placeholder={props.placeholder ?? 'Enter a detailed description'}
            name={props.name ?? CommonFormFieldNames.DESCRIPTION}
         />
      </FormControlWrapper>
   );
};
