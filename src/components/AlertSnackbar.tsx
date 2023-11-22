import {
   Alert,
   AlertProps,
   Snackbar,
   SnackbarProps as MuiSnackbarProps,
   styled,
   Typography,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Colors } from '@app/constants/colors';
import { useEffect, useState } from 'react';

const MuiAlert = styled(Alert)<{ percentage: number }>(({ percentage, severity }) => ({
   color: 'black',
   padding: '10px 15px',
   boxShadow: ' 0px 0px 6px 0px #00000040',
   borderRadius: '8px',
   maxWidth: '400px',
   backgroundColor: 'white',
   '&::before': {
      content: '""',
      position: 'absolute',
      width: `${percentage}%`,
      borderBottom: `4px solid ${severity === 'error' ? Colors.Primary : Colors.Success}`,
      bottom: '0',
      left: '0',
      borderRadius: '8px',
   },
}));

interface SnackbarProps extends MuiSnackbarProps {
   message: string;
   alertType?: AlertProps['severity'];
   alertProps?: AlertProps;
   title?: string;
}

export const AlertSnackbar = ({
   message,
   autoHideDuration = 8000,
   alertType = 'info',
   alertProps,
   title = 'System Alert',
   ...otherProps
}: SnackbarProps) => {
   const [open, setOpen] = useState(true);
   const [percentage, setPercentage] = useState(0);

   const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
         return;
      }
      setOpen(false);
   };

   useEffect(() => {
      if (autoHideDuration) {
         let intervalCount = 1;
         const totalCount = autoHideDuration / 50;

         const interval = setInterval(() => {
            setPercentage((intervalCount / totalCount) * 100);
            intervalCount++;
            if (totalCount === intervalCount) {
               clearInterval(interval);
               setPercentage(0);
            }
         }, 50);
      }
   }, [open]);

   return (
      <Snackbar open={open} autoHideDuration={autoHideDuration} {...otherProps} onClose={handleClose}>
         <MuiAlert
            percentage={percentage}
            severity={alertType}
            {...alertProps}
            onClose={handleClose}
            iconMapping={{
               error: <InfoIcon sx={{ color: Colors.Primary, fontSize: 30 }} />,
               success: <CheckCircleIcon sx={{ color: Colors.Success, fontSize: 30 }} />,
            }}
         >
            <Typography sx={{ mb: 1 }}>{title}</Typography>
            <Typography variant="caption"> {message}</Typography>
         </MuiAlert>
      </Snackbar>
   );
};
