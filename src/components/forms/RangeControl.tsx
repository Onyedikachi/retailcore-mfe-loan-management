import { Grid } from '@mui/material';
import { ControlType, FormControlBase } from './FormControl';

interface EarningsControlProps {
   extraLeft?: string;
   extraRight?: string;
   firstPlaceHolder?: string;
   secondPlaceHolder?: string;
   firstName: string;
   secondName: string;
   firstControl?: ControlType;
   secondControl?: ControlType;
   bridgeWord?: string;
   isFirstCurrency?: boolean;
   isSecondCurrency?: boolean;
}
export const RangeControl = ({
   bridgeWord,
   extraLeft,
   extraRight,
   firstName,
   secondName,
   firstPlaceHolder,
   isFirstCurrency,
   isSecondCurrency,
   firstControl,
   secondControl,
   secondPlaceHolder,
}: EarningsControlProps) => {
   return (
      <Grid container>
         <Grid item xs={5.5}>
            <FormControlBase
               name={firstName}
               currency={isFirstCurrency}
               control={firstControl ?? 'input'}
               placeholder={firstPlaceHolder}
               extraRight={extraRight}
               extraLeft={extraLeft}
            />
         </Grid>
         {bridgeWord && (
            <Grid item xs={1} textAlign="center">
               {bridgeWord}
            </Grid>
         )}
         <Grid item xs={5.5}>
            <FormControlBase
               name={secondName}
               currency={isSecondCurrency}
               control={secondControl ?? 'input'}
               placeholder={secondPlaceHolder}
            />
         </Grid>
      </Grid>
   );
};
