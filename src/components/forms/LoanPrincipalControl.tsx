import { FormControlBase } from './FormControl';
import FormControlWrapper from './FormControlWrapper';

export type LoanPrincipalControlProps = {
   name: string;
   label: string;
   tooltipText?: string;
   required?: boolean;
   extraLeft?: string;
};

export const LoanPrincipalControl = ({
   name,
   label,
   tooltipText,
   required,
   extraLeft,
   ...otherProps
}: LoanPrincipalControlProps) => {
   return (
      <FormControlWrapper name={name} label={label} required={required ?? true} tooltipText={tooltipText}>
         <FormControlBase
            name={name}
            currency
            placeholder="1"
            extraLeft={extraLeft ?? 'NGN'}
            {...otherProps}
            control="input"
         />
      </FormControlWrapper>
   );
};
