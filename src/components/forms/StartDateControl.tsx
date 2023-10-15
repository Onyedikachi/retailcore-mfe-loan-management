import { Grid } from '@mui/material';
import { FormControlBase } from './FormControl';
import { CounterControl } from './CounterControl';
import { PluralizePeriodicity2 } from '@app/constants';

interface StartDateProps {
   firstPlaceHolder?: string;
   thirdPlaceHolder?: string;
   firstName: string;
   secondName: string;
   thirdName: string;
   bridgeWord?: string;
}
export const StartDateControl = ({
   bridgeWord,
   firstName,
   secondName,
   thirdName,
   thirdPlaceHolder,
   firstPlaceHolder,
}: StartDateProps) => {
   return (
      <Grid container>
         <Grid item xs={4} pr={2}>
            <FormControlBase name={firstName} control="date" placeholder={firstPlaceHolder} />
         </Grid>
         {bridgeWord && (
            <Grid item xs={2} textAlign="center">
               {bridgeWord}
            </Grid>
         )}
         <Grid item xs={3} pr={3}>
            <CounterControl name={secondName} />
         </Grid>
         <Grid item xs={3}>
            <FormControlBase
               control="select"
               name={thirdName}
               placeholder={thirdPlaceHolder}
               options={PluralizePeriodicity2}
            />
         </Grid>
      </Grid>
   );
};
