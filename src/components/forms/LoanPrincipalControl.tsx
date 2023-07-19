import { FormControlBase } from './FormControl';
import FormControlWrapper from './FormControlWrapper';

export interface LoanPrincipalControlProps {
   name: string;
   label: string;
   tooltipText?: string;
   required?: boolean;
}

export const LoanPrincipalControl = (props: LoanPrincipalControlProps) => {
   return (
      <FormControlWrapper
         name={props.name}
         label={props.label}
         required={props.required ?? true}
         tooltipText={props.tooltipText}
      >
         <FormControlBase name={props.name} currency control="input" placeholder="1" extraLeft="NGN" />
      </FormControlWrapper>
   );
};
