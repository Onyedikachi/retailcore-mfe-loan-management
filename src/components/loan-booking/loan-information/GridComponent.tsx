import { Ellipsis } from '@app/components/atoms/Ellipsis';
import { Grid, Typography } from '@mui/material';

export const GridComponent: React.FC<{
   property: string;
   value?: string;
   heading?: string;
   secondValue?: string;
   secondkey?: string;
   secondproperty?: string;
   thirdkey?: string;
   thirdproperty?: string;
   thirdValue?: string;
   fourthkey?: string;
   fourthproperty?: string;
   fourthValue?: string;
}> = (props) => {
   return (
      <>
         {props?.heading && (
            <Typography sx={{ textDecoration: 'underline', fontSize: 13, mb: 2 }}>
               {props?.heading}
            </Typography>
         )}
         <Grid container key={props?.property} fontSize={13} mb={2}>
            <Grid item xs={7} pr={1}>
               <Ellipsis text={props?.property} />
            </Grid>
            <Grid item xs={5} fontWeight="400">
               <Typography sx={{ fontSize: 13, mb: 2 }}>{props?.value ?? ''}</Typography>
            </Grid>

            {props?.secondValue ? (
               <>
                  <Grid item xs={7} pr={1}>
                     <Ellipsis text={props?.secondproperty ?? ''} />
                  </Grid>
                  <Grid item xs={5} fontWeight="400">
                     <Typography sx={{ fontSize: 13, mb: 2 }}>{props?.secondValue ?? ''}</Typography>
                  </Grid>
               </>
            ) : null}

            {props?.thirdValue ? (
               <>
                  <Grid item xs={7} pr={1}>
                     <Ellipsis text={props?.thirdproperty ?? ''} />
                  </Grid>
                  <Grid item xs={5} fontWeight="400">
                     <Typography sx={{ fontSize: 13, mb: 2 }}>{props?.thirdValue ?? ''}</Typography>
                  </Grid>
               </>
            ) : null}

            {props?.fourthValue ? (
               <>
                  <Grid item xs={7} pr={1}>
                     <Ellipsis text={props?.fourthproperty ?? ''} />
                  </Grid>
                  <Grid item xs={5} fontWeight="400">
                     <Typography sx={{ fontSize: 13, mb: 2 }}>{props?.fourthValue ?? ''}</Typography>
                  </Grid>
               </>
            ) : null}
         </Grid>
      </>
   );
};
