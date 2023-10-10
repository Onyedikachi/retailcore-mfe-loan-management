import { LineChart } from '../charts.tsx/LineChart';
import { ChartWrapper } from './ChartWrapper';

export const LoanRepaymentPerformance = () => {
   return (
      <ChartWrapper dataDetails={dataDetails} title="Loan Repayment Performance">
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
      [50, 57, 30, 80, 85, 48, 80, 57, 50, 48, 25, 25],
      [85, 57, 80, 48, 85, 48, 57, 57, 48, 50, 30, 80],
      [50, 80, 34, 30, 57, 48, 80, 25, 25, 80, 85, 48],
   ],
   backgroundColors: ['#F94144', '#5EBFE8', '#F8961E'],
};
