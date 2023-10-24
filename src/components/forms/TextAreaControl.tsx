import { FormControlBase } from './FormControl';
import FormControlWrapper from './FormControlWrapper';

export interface TextAreaControlProps {
   name: string;
   required?: boolean;
   label?: string;
   tooltipText?: string;
   placeholder?: string;
   rows?: number;
}

export const TextAreaControl = (props: TextAreaControlProps) => {
   return (
      <FormControlWrapper
         name={props.name}
         label={props.label}
         required={props.required}
         tooltipText={props.tooltipText}
      >
         <FormControlBase
            control="input"
            multiline
            rows={props?.rows ?? 4}
            variant="outlined"
            placeholder={props.placeholder}
            name={props.name}
         />
      </FormControlWrapper>
   );
};
