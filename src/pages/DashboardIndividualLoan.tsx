import { DashboardHeader } from '@app/components';
import { IndividualLoan } from '@app/components/dashboard/individual';
import { PageLayout } from '@app/layouts/PageLayout';

export const DashboardIndividualLoan = () => {
   return <PageLayout header={<DashboardHeader />} content={<IndividualLoan />} fullContent={false} />;
};
