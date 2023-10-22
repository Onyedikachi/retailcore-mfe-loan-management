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
   layoutFlexGrid?: number[];
   disabled?: boolean;
};

export const LoanPrincipalControl = ({
   name,
   label,
   tooltipText,
   required,
   extraLeft,
   layout,
   placeholder,
   layoutFlexGrid,
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
         layoutFlexGrid={layoutFlexGrid}
         tooltipText={tooltipText}
      >
         <FormControlBase
            name={name}
            currency
            placeholder={placeholder ?? '0'}
            extraLeft={extraLeft ?? extraLeft}
            {...otherProps}
            control="input"
         />
      </FormControlWrapper>
   );
};
