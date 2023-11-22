import { Grid, Typography, styled } from '@mui/material';
import Box from '@mui/system/Box';
import { DataDetails } from './ChartWrapper';
import { useRequestData } from 'react-http-query';
import { CurrencyListResponse } from '@app/@types';
import { getDefaultCurrency } from '@app/helper/currency-helper';
import { REQUEST_NAMES } from '@app/constants';

const RoundedDot = styled(Box)(() => ({
   width: '7px',
   height: '7px',
   marginTop: '8px',
   marginRight: '8px',
   borderRadius: '50%',
}));

export const Legend: React.FC<{
   dataDetails: DataDetails;
}> = ({ dataDetails }) => {
   const currencies = useRequestData<CurrencyListResponse>(REQUEST_NAMES.CURRENCY_LIST);
   const defaultCurrency = getDefaultCurrency(currencies);

   return (
      <Grid container display="flex" my={2}>
         {dataDetails.footerlabels?.map((label, index) => (
            <Grid
               item
               xs={4}
               display="flex"
               key={`${label + index * 2}`}
               justifyContent={dataDetails.labelAmount ? 'start' : 'center'}
            >
               <RoundedDot sx={{ backgroundColor: dataDetails.backgroundColors[index] }} />
               <Box>
                  <Typography display="flex" alignItems="center">
                     {label}
                  </Typography>
                  {dataDetails.labelAmount && (
                     <Typography>
                        {defaultCurrency?.abbreviation ?? 'NGN'} {dataDetails.labelAmount[index]}
                     </Typography>
                  )}
               </Box>
            </Grid>
         ))}
      </Grid>
   );
};
