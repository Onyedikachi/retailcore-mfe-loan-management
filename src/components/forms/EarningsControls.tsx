import { Grid } from '@mui/material';
import { FormControlBase } from './FormControl';
import { CounterControl } from './CounterControl';
import { LoanTenurePeriod } from '@app/constants';

interface EarningsControlProps {
   extraLeft?: string;
   extraRight?: string;
   firstPlaceHolder?: string;
   thirdPlaceHolder?: string;
   firstName: string;
   secondName: string;
   thirdName: string;
   bridgeWord?: string;
   isCurrency?: boolean;
}
export const EarningsControl = ({
   bridgeWord,
   extraLeft,
   extraRight,
   firstName,
   secondName,
   thirdName,
   thirdPlaceHolder,
   firstPlaceHolder,
   isCurrency,
}: EarningsControlProps) => {
   return (
      <>
         <Grid item xs={4} pr={6}>
            <FormControlBase
               name={firstName}
               currency={isCurrency}
               ratio={!isCurrency}
               control="input"
               placeholder={firstPlaceHolder}
               extraRight={extraRight}
               extraLeft={extraLeft}
            />
         </Grid>
         {bridgeWord && (
            <Grid item xs={1}>
               {bridgeWord}
            </Grid>
         )}
         <Grid item xs={3} pr={6}>
            <CounterControl name={secondName} />
         </Grid>
         <Grid item xs={3} pr={4}>
            <FormControlBase
               control="select"
               name={thirdName}
               placeholder={thirdPlaceHolder}
               options={LoanTenurePeriod}
            />
         </Grid>
      </>
   );
};
