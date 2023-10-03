import { Button } from '@app/components/atoms/Button';
import { useFormikContext } from 'formik';

export const ActionButton: React.FC<{
   name: string;
   text: string;
   onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}> = (props) => {
   const { getFieldProps } = useFormikContext();
   return (
      <Button
         color={getFieldProps(props.name).value?.length > 0 ? 'primary' : 'inherit'}
         variant="text"
         sx={{ textDecoration: 'underline', textTransform: 'initial', pr: 1 }}
         onClick={props.onClick}
      >
         {props.text}
      </Button>
   );
};
export const assetsOptions = [
   'Current Account balances [ASTCAS23421]',
   'Savings Account balances [ASTCAS23422]',
   'Cash Receipt balances [ASTCAS23423]',
   'Current Account balances [ASTCAS23424]',
   'Current Account balances [ASTCAS23425]',
];
