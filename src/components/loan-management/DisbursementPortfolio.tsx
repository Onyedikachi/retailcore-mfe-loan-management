import { Box, Divider, Grid, Typography } from '@mui/material';
import { FilterFunnel } from '../icons/FilterFunnel';
import { DoughnutChart } from '../charts.tsx/DoughnutChart';

export const DisbursementPortfolio: React.FC = () => {
   const dataDetails = {
      labels: ['Individual', 'SME', 'Corporate'],
      data: [50, 25, 25],
      amount: ['50,000,000', '25,000,000', '25,000,000'],
      backgroundColors: ['#F94144', '#5EBFE8', '#F8961E'],
   };
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
            <Typography fontWeight="bold">Disbursement Portfolio</Typography>{' '}
            <Typography fontSize={14} display="flex" alignItems="center">
               Filter by Date
               <FilterFunnel sx={{ ml: 1, fontSize: 14 }} />
            </Typography>
         </Box>
         <Divider />
         <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Typography fontSize={12}>
               NGN
               <Typography component="span" fontWeight="bold" fontSize={20} ml={1.5}>
                  100,000,000.00
               </Typography>
            </Typography>
            <Typography fontSize={14}>Sept, 2022 till date</Typography>
         </Box>
         <DoughnutChart dataDetails={dataDetails} legend={<Legend dataDetails={dataDetails} />} />
      </Box>
   );
};

const Legend: React.FC<{
   dataDetails: { labels: string[]; data: number[]; amount: string[]; backgroundColors: string[] };
}> = ({ dataDetails }) => {
   return (
      <Grid container display="flex" my={2}>
         {dataDetails.labels.map((label, index) => (
            <Grid item xs={4} display="flex" key={label + index}>
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
                  <Typography>NGN {dataDetails.amount[index]}</Typography>
               </Box>
            </Grid>
         ))}
      </Grid>
   );
};
