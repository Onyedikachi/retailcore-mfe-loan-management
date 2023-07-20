import * as React from 'react';
import { Dialog as MuiDialog } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Colors } from '@app/constants';

interface DialogProps {
   open: boolean;
   handleClose: () => void;
   children: React.ReactNode;
   title: string;
}
const Dialog: React.FC<DialogProps> = ({ open, handleClose, title, children }) => {
   return (
      <div>
         <MuiDialog
            onClose={handleClose}
            open={open}
            PaperProps={{ style: { minWidth: '60%', padding: '0 20px' } }}
            sx={{
               '& .MuiDialogContent-root': { padding: '10px 0px' },
               '& .MuiBackdrop-root': {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  borderBottom: 'unset',
               },
            }}
         >
            <DialogTitle
               sx={{ m: 0, pt: 2, pb: 0.6, px: 0, borderBottom: '1px solid rgba(204, 204, 204, 1)' }}
            >
               {title}
               <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                  <CloseIcon />
               </IconButton>
            </DialogTitle>
            <DialogContent dividers>{children}</DialogContent>
         </MuiDialog>
      </div>
   );
};
export default Dialog;
