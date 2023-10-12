import { DashboardHeader } from '@app/components';
import { NonPerformingLoans } from '@app/components/loan-management/loan-performance/NonPerformingLoans';
import { PerformingLoans } from '@app/components/loan-management/loan-performance/PerformingLoans';
import { PageLayout } from '@app/layouts/PageLayout';

export const DashbordOverview = () => {
   return <PageLayout header={<DashboardHeader />} content={<PerformingLoans />} fullContent={false} />;
};
