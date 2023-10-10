import { Box, Divider, Grid, Typography, styled } from '@mui/material';
import { useRequestData } from 'react-http-query';
import { CurrencyListResponse } from '@app/@types';
import { REQUEST_NAMES } from '@app/constants';
import { getDefaultCurrency } from '@app/helper/currency-helper';
import { PaddedContainer } from '../containers/PaddedContainer';
import { DateFilter } from '../calendar/DateFilter';
import { useState } from 'react';
import { formattedDate } from '@app/helper/formater';
import { Legend } from './Legend';

export interface DataDetails {
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
   const [dateRange, setDateRange] = useState<{ startDate?: string; endDate?: string }>({});
   const dataStartDate = 'Sept, 2000';

   return (
      <PaddedContainer sx={{ py: 2, px: 3, bgcolor: 'white' }}>
         <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography fontWeight="bold">{title}</Typography>{' '}
            <Typography fontSize={14} display="flex" alignItems="center">
               Filter by Date
               <DateFilter
                  onDateRangeChange={(startDate, endDate) => {
                     setDateRange({
                        startDate: formattedDate(startDate ?? '', true),
                        endDate: formattedDate(endDate ?? '', true),
                     });
                  }}
               />
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
            <Typography fontSize={14}>
               {dateRange.startDate ?? dataStartDate} - {dateRange.endDate ?? 'till date'}
            </Typography>
         </Box>
         {children}
         <Legend dataDetails={dataDetails} />
      </PaddedContainer>
   );
};
