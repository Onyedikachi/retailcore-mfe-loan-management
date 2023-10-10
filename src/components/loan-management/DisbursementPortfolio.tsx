import { DoughnutChart } from '../charts.tsx/DoughnutChart';
import { ChartWrapper } from './ChartWrapper';

export const DisbursementPortfolio = () => {
   return (
      <ChartWrapper dataDetails={dataDetails} title="Disbursement Portfolio" total={'100,000'}>
         <DoughnutChart dataDetails={dataDetails} />
      </ChartWrapper>
   );
};
const dataDetails = {
   labels: ['Individual', 'SME', 'Corporate'],
   footerlabels: ['Individual', 'SME', 'Corporate'],
   data: [50, 25, 25],
   labelAmount: ['50,000,000', '25,000,000', '25,000,000'],
   backgroundColors: ['#F94144', '#5EBFE8', '#F8961E'],
};
