import { Box, Divider, Grid, Typography } from '@mui/material';
import { FilterFunnel } from '../icons/FilterFunnel';
import { useRequestData } from 'react-http-query';
import { CurrencyListResponse } from '@app/@types';
import { REQUEST_NAMES } from '@app/constants';
import { getDefaultCurrency } from '@app/helper/currency-helper';

interface DataDetails {
   labels?: string[];
   footerlabels?: string[];
   data: number[];
   labelAmount?: string[];
   backgroundColors: string[];
}
interface ChartWrapperProps {
   dataDetails: DataDetails;
   children: React.ReactNode;
   title: string;
   total?: string;
}

export const ChartWrapper: React.FC<ChartWrapperProps> = ({ children, title, total, dataDetails }) => {
   const currencies = useRequestData<CurrencyListResponse>(REQUEST_NAMES.CURRENCY_LIST);
   const defaultCurrency = getDefaultCurrency(currencies);

   return (
      <Box
         sx={{
            borderRadius: '5px',
            py: 2,
            px: 3,
            boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)',
         }}
      >
         <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography fontWeight="bold">{title}</Typography>{' '}
            <Typography fontSize={14} display="flex" alignItems="center">
               Filter by Date
               <FilterFunnel sx={{ ml: 1, fontSize: 14 }} />
            </Typography>
         </Box>
         <Divider />
         <Box sx={{ display: 'flex', justifyContent: total ? 'space-between' : 'end', mt: 2 }}>
            {total && (
               <Typography fontSize={12}>
                  {defaultCurrency?.abbreviation ?? 'NGN'}
                  <Typography component="span" fontWeight="bold" fontSize={20} ml={1.5}>
                     {total}
                  </Typography>
               </Typography>
            )}
            <Typography fontSize={14}>Sept, 2022 till date</Typography>
         </Box>
         {children}
         <Legend dataDetails={dataDetails} />
      </Box>
   );
};

const Legend: React.FC<{
   dataDetails: DataDetails;
}> = ({ dataDetails }) => {
   return (
      <Grid container display="flex" my={2}>
         {dataDetails.footerlabels?.map((label, index) => (
            <Grid
               item
               xs={4}
               display="flex"
               key={label + index}
               justifyContent={dataDetails.labelAmount ? 'start' : 'center'}
            >
               <Box
                  sx={{
                     width: '7px',
                     height: '7px',
                     mt: 1,
                     mr: 1,
                     backgroundColor: dataDetails.backgroundColors[index],
                     borderRadius: '50%',
                  }}
               />
               <Box>
                  <Typography display="flex" alignItems="center">
                     {label}
                  </Typography>
                  {dataDetails.labelAmount && <Typography>NGN {dataDetails.labelAmount[index]}</Typography>}
               </Box>
            </Grid>
         ))}
      </Grid>
   );
};
