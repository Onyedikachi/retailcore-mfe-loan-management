import { Grid, styled } from '@mui/material';

const StyledGridItem = styled(Grid)({ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' });

export const GridComponent: React.FC<{ property: string; value?: string }> = (props) => {
   return (
      <Grid container key={props?.property} fontSize={13} mb={2}>
         <StyledGridItem item xs={7}>
            {props?.property}
         </StyledGridItem>
         <StyledGridItem item xs={5} fontWeight="400">
            {props?.value}
         </StyledGridItem>
      </Grid>
   );
};
