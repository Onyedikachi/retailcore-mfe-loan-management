import AutoCompleteWithTabsControl from '@app/components/forms/AutoCompleteWithTabsControl';
import FormControlWrapper from '@app/components/forms/FormControlWrapper';
import { InputFieldNames, TooltipText } from '@app/utils/validators/book-a-loan/transaction-settings';
import { Grid, Typography } from '@mui/material';
import { TabContent } from './TabContent';
import { Button } from '@app/components/atoms/Button';
import { useFormikContext } from 'formik';
type InputNames = typeof InputFieldNames;
type ToolTipKeys = keyof typeof TooltipText;
interface CustomAccountEntryFieldProps {
   label: string;
   debitLedgername: InputNames[keyof InputNames];
   creditLedgername: InputNames[keyof InputNames];
   onClickActionButtonDebit: React.MouseEventHandler<HTMLButtonElement> | undefined;
   onClickActionButtonCredit: React.MouseEventHandler<HTMLButtonElement> | undefined;
}
export const CustomAccountEntryField: React.FC<CustomAccountEntryFieldProps> = (props) => {
   return (
      <>
         <FormControlWrapper
            name={props.debitLedgername}
            label={props.label}
            required
            tooltipText={TooltipText[props.debitLedgername as ToolTipKeys]}
         >
            <Grid container>
               <Grid item xs={6} pr={4} mt={1}>
                  <Typography>Debit Ledger</Typography>
                  <AutoCompleteWithTabsControl
                     tabLabels={['Assets', 'Liabilities', 'Equities', 'Revenue', 'Expenses']}
                     tabPanels={[<TabContent name={props.debitLedgername} options={assetsOptions} />]}
                     bottomButton={
                        <ActionButton
                           name={props.debitLedgername}
                           text="Add selected ledger(s)"
                           onClick={props.onClickActionButtonDebit}
                        />
                     }
                     name={props.debitLedgername}
                  />
               </Grid>
               <Grid item xs={6} mt={1}>
                  <Typography>Credit Ledger</Typography>
                  <AutoCompleteWithTabsControl
                     tabLabels={['Assets', 'Liabilities', 'Equities', 'Revenue', 'Expenses']}
                     tabPanels={[<TabContent name={props.creditLedgername} options={assetsOptions} />]}
                     bottomButton={
                        <ActionButton
                           name={props.creditLedgername}
                           text="Add selected ledger(s)"
                           onClick={props.onClickActionButtonCredit}
                        />
                     }
                     name={props.creditLedgername}
                  />
               </Grid>
            </Grid>
         </FormControlWrapper>
      </>
   );
};
const ActionButton: React.FC<{
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
const assetsOptions = [
   'Current Account balances [ASTCAS23421]',
   'Savings Account balances [ASTCAS23422]',
   'Cash Receipt balances [ASTCAS23423]',
   'Current Account balances [ASTCAS23424]',
   'Current Account balances [ASTCAS23425]',
];
