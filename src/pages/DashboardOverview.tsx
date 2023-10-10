import { DashboardHeader } from '@app/components';
import { DisbursementPerformance } from '@app/components/loan-management/DisbursementPerformance';
import { PageLayout } from '@app/layouts/PageLayout';

export const DashbordOverview = () => {
   return (
      <PageLayout header={<DashboardHeader />} content={<DisbursementPerformance />} fullContent={false} />
   );
};
