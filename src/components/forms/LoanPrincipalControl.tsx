import { FormControlBase } from './FormControl';
import FormControlWrapper from './FormControlWrapper';

export type LoanPrincipalControlProps = {
   name: string;
   label: string;
   tooltipText?: string;
   required?: boolean;
   extraLeft?: string;
   layout?: 'horizontal' | 'vertical' | undefined;
   mb?: number;
   placeholder?: string;
};

export const LoanPrincipalControl = ({
   name,
   label,
   tooltipText,
   required,
   extraLeft,
   layout,
   placeholder,
   mb,
   ...otherProps
}: LoanPrincipalControlProps) => {
   return (
      <FormControlWrapper
         sx={{ mb: mb }}
         name={name}
         label={label}
         required={required ?? true}
         layout={layout}
         tooltipText={tooltipText}
      >
         <FormControlBase
            name={name}
            currency
            placeholder={placeholder ?? '0'}
            extraLeft={extraLeft ?? 'NGN'}
            {...otherProps}
            control="input"
         />
      </FormControlWrapper>
   );
};
