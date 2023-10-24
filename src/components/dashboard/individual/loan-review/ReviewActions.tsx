import BlockIcon from '@mui/icons-material/Block';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { SubmitIcon } from '@app/components/icons/Submit';
import { Button } from '@app/components/atoms/Button';
import { Box } from '@mui/material';
interface ReviewActionButtonsProps {
   onCancel: () => void;
   onReject: () => void;
   onApprove: () => void;
}

export const ReviewActionButtons: React.FC<ReviewActionButtonsProps> = ({
   onCancel,
   onReject,
   onApprove,
}) => {
   return (
      <Box display="flex" alignItems="center" justifyContent="space-between">
         <Button onClick={onCancel} variant="outlined" startIcon={<HighlightOffIcon />}>
            Cancel
         </Button>
         <Box display="flex" gap={3}>
            <Button variant="outlined" startIcon={<BlockIcon />} onClick={onReject}>
               Reject
            </Button>
            <Button color="primary" variant="contained" startIcon={<SubmitIcon />} onClick={onApprove}>
               Approve
            </Button>
         </Box>
      </Box>
   );
};
