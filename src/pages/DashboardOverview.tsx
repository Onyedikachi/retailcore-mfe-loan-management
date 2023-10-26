import { DashboardHeader } from '@app/components';
import { PageLayout } from '@app/layouts/PageLayout';

export const DashboardOverview = () => {
   return <PageLayout header={<DashboardHeader />} content={undefined} fullContent={false} />;
};
