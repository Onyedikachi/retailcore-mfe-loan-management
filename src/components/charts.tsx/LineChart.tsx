import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Box } from '@mui/material';
import { useRequestData } from 'react-http-query';
import { CurrencyListResponse } from '@app/@types';
import { getDefaultCurrency } from '@app/helper/currency-helper';
import { REQUEST_NAMES } from '@app/constants';
import { bigValueFormatter } from '@app/helper/formater';
ChartJS.register(ChartDataLabels, CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

interface LineChartProps {
   dataDetails: { labels: string[]; data: number[][]; amount?: string[]; backgroundColors: string[] };
   width?: string;
   height?: string;
}

export const options = (currency: string) => {
   return {
      maintainAspectRatio: true,
      responsive: true,
      plugins: {
         legend: { display: false },
         datalabels: { display: false },
      },
      scales: {
         x: {
            grid: { display: false },
         },
         y: {
            border: { display: false, dash: [2, 2], color: '#D7E4F0' },
            ticks: {
               padding: 10,
               callback: (value: any) => `${currency}${bigValueFormatter(value)}`,
            },
         },
      },
   };
};

export const data = (labels: string[], data: number[][], backgroundColors: string[]) => {
   const datasets = data.map((eachData, index) => {
      return {
         data: eachData,
         backgroundColors: backgroundColors[index],
         borderColor: backgroundColors[index],
         borderWidth: 2,
         pointRadius: 1.2,
      };
   });

   return {
      labels: labels,
      datasets: datasets,
   };
};

export const LineChart: React.FC<LineChartProps> = ({ width, height, dataDetails }) => {
   const currencies = useRequestData<CurrencyListResponse>(REQUEST_NAMES.CURRENCY_LIST);
   const defaultCurrency = getDefaultCurrency(currencies);
   return (
      <Box sx={{ width: width ?? '100%', py: 2 }}>
         <Line
            style={{ width: '100%', maxHeight: height ?? '180px' }}
            options={options(defaultCurrency?.abbreviation ?? '')}
            data={data(dataDetails.labels, dataDetails.data, dataDetails.backgroundColors)}
         />
      </Box>
   );
};
