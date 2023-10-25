import { Button } from '@app/components/atoms/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import BlockIcon from '@mui/icons-material/Block';
import { Colors } from '@app/constants/colors';
import { WriteOff } from '@app/components/icons/WriteOff';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LoanProductPath } from '@app/constants/routes';
import { menuActionFromStatus } from '@app/constants/dashboard';

interface ActionButtonsProps {
   onClickAction: (action: string) => void;
   loanStatus?: string;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onClickAction, loanStatus }) => {
   const [searchParams] = useSearchParams();
   const id = searchParams.get('id');
   const navigate = useNavigate();
   const actions = menuActionFromStatus(loanStatus ?? '');

   const listActionsItems = [
      {
         icon: <VisibilityIcon sx={{ color: '#D4A62F' }} />,
         onClick: () => navigate(`${LoanProductPath}?id=${id}`),
      },
      { icon: <CloseIcon />, onClick: () => onClickAction('closure') },
      { icon: <BlockIcon sx={{ color: Colors.Primary }} />, onClick: () => onClickAction('liquidation') },
      { icon: <WriteOff />, onClick: () => onClickAction('write-off') },
   ];

   return (
      <>
         {actions?.map((action, index) => (
            <Button
               key={action}
               variant="text"
               startIcon={listActionsItems[index].icon}
               sx={{ color: 'inherit', px: 1, mr: 2 }}
               onClick={() => listActionsItems[index].onClick()}
            >
               {action}
            </Button>
         ))}
      </>
   );
};
