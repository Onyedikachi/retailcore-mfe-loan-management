import { LineChart } from '../charts.tsx/LineChart';
import { ChartWrapper } from './ChartWrapper';

export const DisbursementPerformance = () => {
   return (
      <ChartWrapper dataDetails={dataDetails} title="Disbursement Performance">
         <LineChart dataDetails={lineChartData} />
      </ChartWrapper>
   );
};

const dataDetails = {
   footerlabels: ['Individual', 'SME', 'Corporate'],
   data: [50, 25, 25],
   backgroundColors: ['#F94144', '#5EBFE8', '#F8961E'],
};

const lineChartData = {
   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
   data: [
      [5000, 5700, 3000, 8000, 8500, 4800, 8000, 5700, 5000, 4800, 2500, 2500],
      [8500, 5700, 8000, 4800, 8500, 4800, 5700, 5700, 4800, 5000, 3000, 8000],
      [5000, 8000, 3400, 3000, 5700, 4800, 8000, 2500],
   ],
   backgroundColors: ['#F94144', '#5EBFE8', '#F8961E'],
};
