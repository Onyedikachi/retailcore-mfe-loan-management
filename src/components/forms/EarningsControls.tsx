import { Grid } from '@mui/material';
import { FormControlBase } from './FormControl';
import { CounterControl } from './CounterControl';
import { FormikProps } from 'formik';
import { LoanTenurePeriod } from '@app/constants';

interface EarningsControlProps {
   extraLeft?: string;
   extraRight?: string;
   firstPlaceHolder?: string;
   thirdPlaceHolder?: string;
   firstName: string;
   secondName: string;
   thirdName: string;
   formik: FormikProps<any>;
   bridgeWord?: string;
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
   formik,
}: EarningsControlProps) => {
   return (
      <>
         <Grid item xs={4} pr={6}>
            <FormControlBase
               name={firstName}
               decimal
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
            <CounterControl name={secondName} formik={formik} />
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
