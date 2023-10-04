import * as React from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Typography from '@mui/material/Typography';
import { Button } from '../atoms/Button';
import { Colors } from '@app/constants/colors';
import { Dialog as MuiDialog, DialogProps as MuiDialogProps, styled } from '@mui/material';
import { Previous } from '../icons/Modify';

export interface AlertDialogProps extends Omit<MuiDialogProps, 'maxWidth'> {
   open: boolean;
   handleClose: () => void;
   handlePrevious: () => void;
   handleNext: () => void;
   title: string;
   subtitle?: string;
   status: 'success' | 'error';
   previousText?: string;
   nextText?: string;
   children?: React.ReactNode;
}

const StyledDialog = styled(MuiDialog)({
   '& .MuiDialogContent-root': { padding: '10px 0px', marginTop: '12px' },
   '& .MuiBackdrop-root': { backgroundColor: 'rgba(0, 0, 0, 0.1)', borderBottom: 'unset' },
   '& .MuiPaper-root': {
      minWidth: '350px',
      maxWidth: '500px',
      padding: '20px',
      overflow: 'hidden',
      borderRadius: '8px',
   },
});

export const ResponseDialog: React.FC<AlertDialogProps> = ({
   title,
   subtitle,
   open,
   status,
   handleClose,
   handlePrevious,
   previousText,
   nextText,
   children,
   handleNext,
}) => {
   return (
      <StyledDialog onClose={handleClose} open={open}>
         <DialogTitle sx={{ fontWeight: 'bold', m: 0, p: 0 }}>
            <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
               <CloseIcon />
            </IconButton>
         </DialogTitle>
         <DialogContent>
            <Box sx={{ mx: 'auto', textAlign: 'center', mb: 5 }}>
               <Box pb={4}>
                  {status == 'error' ? (
                     <InfoIcon sx={{ color: 'primary.main', fontSize: 50, transform: 'rotate(180deg)' }} />
                  ) : (
                     <CheckCircleIcon sx={{ color: Colors.Success, fontSize: 50 }} />
                  )}
               </Box>
               <Typography fontWeight="400" fontSize={20} mb={2}>
                  {title}
               </Typography>
               {subtitle && (
                  <Typography variant="body2" mb={2}>
                     {subtitle}
                  </Typography>
               )}
            </Box>
            {children}
            <Box display="flex" gap={1} justifyContent={nextText ? 'space-between' : 'center'}>
               <Button
                  sx={{ px: 1, textTransform: 'none', fontWeight: 400, color: 'initial' }}
                  onClick={() => {
                     handleClose();
                     handlePrevious();
                  }}
                  variant="text"
                  startIcon={<Previous sx={{ color: Colors.Primary }} />}
               >
                  {previousText ?? 'Return to dashboard'}
               </Button>
               {nextText && (
                  <Button
                     sx={{ px: 1, textTransform: 'none', fontWeight: 400, color: 'initial' }}
                     onClick={() => {
                        handleClose();
                        handleNext();
                     }}
                     type="submit"
                     variant="text"
                     endIcon={<ArrowForwardIosIcon sx={{ color: Colors.Primary }} />}
                  >
                     {nextText}
                  </Button>
               )}
            </Box>
         </DialogContent>
      </StyledDialog>
   );
};
