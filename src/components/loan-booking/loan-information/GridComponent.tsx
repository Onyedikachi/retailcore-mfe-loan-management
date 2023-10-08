import { Grid } from '@mui/material';

export const GridComponent: React.FC<{ property: string; value?: string }> = (props) => {
   return (
      <Grid container key={props?.property} fontSize={13} mb={2}>
         <Grid item xs={7} sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
            {props?.property}
         </Grid>
         <Grid
            item
            xs={5}
            fontWeight="400"
            sx={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', pl: 1 }}
         >
            {props?.value}
         </Grid>
      </Grid>
   );
};
