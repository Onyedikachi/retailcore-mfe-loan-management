import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { ArrowBackRounded } from '@mui/icons-material';

export const BackArrow: React.FC<{ route?: string; text?: string }> = ({ route, text }) => {
   return (
      <Link
         to={route ?? '#'}
         style={{ textDecoration: 'unset', color: 'inherit', display: 'flex', alignItems: 'center' }}
      >
         <IconButton sx={{ padding: 0, mr: 1 }}>
            <ArrowBackRounded></ArrowBackRounded>
         </IconButton>
         {text}
      </Link>
   );
};
