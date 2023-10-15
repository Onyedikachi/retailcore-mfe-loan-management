import { Ellipsis } from '@app/components/atoms/Ellipsis';
import { Grid } from '@mui/material';

export const GridComponent: React.FC<{ property: string; value?: string }> = (props) => {
   return (
      <Grid container key={props?.property} fontSize={13} mb={2}>
         <Grid item xs={7} pr={1}>
            <Ellipsis text={props?.property} />
         </Grid>
         <Grid item xs={5} fontWeight="400">
            <Ellipsis text={props?.value ?? ''} />
         </Grid>
      </Grid>
   );
};
