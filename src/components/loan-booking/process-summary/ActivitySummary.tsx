import { ActivityLog } from '@app/components/atoms/ActivityLog';
import { API_PATH } from '@app/constants';
import { useIndividualLoanDashboardContext } from '@app/providers/individual-loan-dashboard';
import { Box } from '@mui/material';
import { useRequest } from 'react-http-query';
import { useSearchParams } from 'react-router-dom';

export const ActivitySummary = () => {
   const [searchParams] = useSearchParams();
   const id = searchParams.get('id');
   const { getLoanProduct, loanProduct } = useIndividualLoanDashboardContext();
   const activities = loanProduct?.loanActivities?.map((activity) => ({
      pending: false,
      date: activity.dateCreated,
      subtitle: activity.createdBy,
      title: activity.commentText,
   }));

   useRequest(
      {
         onMount: (getLoanData) => {
            id && getLoanData(`${API_PATH.IndividualLoan}/${id}`, { showSuccess: false });
         },
         onSuccess: (response) => getLoanProduct(response.data),
      },
      [id]
   );

   return (
      <Box p={2} borderRadius="5px" bgcolor="white" ml={2} height="100%">
         <ActivityLog logs={activities} />
      </Box>
   );
};
