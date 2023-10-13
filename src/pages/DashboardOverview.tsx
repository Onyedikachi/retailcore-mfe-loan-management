import { DashboardHeader } from '@app/components';
import { PageLayout } from '@app/layouts/PageLayout';

export const DashbordOverview = () => {
   return (
      <PageLayout header={<DashboardHeader />} content={undefined} fullContent={false} />
   );
};
