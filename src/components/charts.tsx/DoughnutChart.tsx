import React from 'react';
import { Chart as ChartJS, ArcElement, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Box } from '@mui/material';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Legend, ChartDataLabels);

export const data = (labels: string[], data: number[], backgroundColors: string[]) => ({
   labels: labels,
   datasets: [{ data: data, backgroundColor: backgroundColors }],
});

const options = {
   maintainAspectRatio: true,
   responsive: true,
   plugins: {
      legend: { display: false },
      datalabels: {
         color: 'white',
         font: { size: 12 },
         display: true,
         formatter: (value: string) => value + '%',
      },
   },
};
interface DoughnutChartProps {
   width?: string;
   height?: string;
   dataDetails: { labels: string[]; data: number[]; amount?: string[]; backgroundColors: string[] };
   legend: React.ReactNode;
}
export const DoughnutChart: React.FC<DoughnutChartProps> = ({ width, height, dataDetails, legend }) => {
   return (
      <Box sx={{ width: width ?? '100%' }}>
         <Doughnut
            style={{ width: '100%', maxHeight: height ?? '180px' }}
            data={data(dataDetails.labels, dataDetails.data, dataDetails.backgroundColors)}
            options={options}
         />
         {legend}
      </Box>
   );
};
