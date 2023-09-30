import { AddCircle } from '@mui/icons-material';
import { Button } from './Button';

interface AddButtonProps {
   color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
   onClick?: () => void;
   onMouseDown?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
   text: string;
}
export const AddButton: React.FC<AddButtonProps> = ({ onClick, onMouseDown, text, color }) => {
   return (
      <Button
         sx={{ py: 0, px: 2, textTransform: 'initial' }}
         onClick={onClick}
         onMouseDown={onMouseDown}
         color={color ?? 'gray'}
         startIcon={<AddCircle sx={{ m: 0, color: 'gray' }} />}
         variant="text"
      >
         {text}
      </Button>
   );
};
