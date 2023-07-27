import { Alert, AlertProps, Snackbar as MuiSnackbar, SnackbarProps as MuiSnackbarProps } from '@mui/material';

interface SnackbarProps extends MuiSnackbarProps {
   message: string;
   alertType?: AlertProps['severity'];
   alertProps?: AlertProps;
}

export const AlertSnackbar = ({
   message,
   autoHideDuration = 8000,
   alertType = 'info',
   alertProps,
   ...otherProps
}: SnackbarProps) => {
   return (
      <MuiSnackbar open={true} autoHideDuration={autoHideDuration} {...otherProps}>
         <Alert severity={alertType} sx={{ width: '100%' }} {...alertProps}>
            {message}
         </Alert>
      </MuiSnackbar>
   );
};
