import { DashboardHeader } from '@app/components';
import { NonPerformingLoans } from '@app/components/loan-management/NonPerformingLoans';
import { PageLayout } from '@app/layouts/PageLayout';

export const DashbordOverview = () => {
   return <PageLayout header={<DashboardHeader />} content={<NonPerformingLoans />} fullContent={false} />;
};
