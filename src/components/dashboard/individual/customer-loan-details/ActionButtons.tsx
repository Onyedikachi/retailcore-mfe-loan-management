import { Button } from '@app/components/atoms/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import BlockIcon from '@mui/icons-material/Block';
import { Colors } from '@app/constants/colors';
import { WriteOff } from '@app/components/icons/WriteOff';
import { useNavigate } from 'react-router-dom';
import { LoanProductPath } from '@app/constants/routes';

interface ActionButtonsProps {
   onClickAction: (action: string) => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onClickAction }) => {
   const navigate = useNavigate();

   return (
      <>
         <Button
            variant="text"
            startIcon={<VisibilityIcon sx={{ color: '#D4A62F' }} />}
            sx={{ color: 'inherit', px: 1, mr: 2 }}
            onClick={() => navigate(LoanProductPath)}
         >
            View Loan Details
         </Button>
         <Button
            variant="text"
            startIcon={<CloseIcon />}
            sx={{ color: 'inherit', px: 1, mr: 2 }}
            onClick={() => onClickAction('closure')}
         >
            Close Loan
         </Button>
         <Button
            variant="text"
            startIcon={<BlockIcon sx={{ color: Colors.Primary }} />}
            sx={{ color: 'inherit', px: 1, mr: 2 }}
            onClick={() => onClickAction('liquidation')}
         >
            Liquidate
         </Button>
         <Button
            variant="text"
            startIcon={<WriteOff />}
            sx={{ color: 'inherit', px: 1, mr: 2 }}
            onClick={() => onClickAction('write-off')}
         >
            Write-Off Loan
         </Button>
      </>
   );
};
