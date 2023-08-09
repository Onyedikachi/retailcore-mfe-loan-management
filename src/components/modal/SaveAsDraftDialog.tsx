import Typography from '@mui/material/Typography';
import { Button } from '../atoms/Button';
import Box from '@mui/material/Box';
import * as React from 'react';
import { Dialog as MuiDialog, DialogProps as MuiDialogProps } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
export interface SaveAsDraftDialogProps extends Omit<MuiDialogProps, 'maxWidth'> {
   open: boolean;
   handleClose: () => void;
   handleSaveAsDraft: () => void;
}
const SaveAsDraftDialog: React.FC<SaveAsDraftDialogProps> = ({ open, handleClose, handleSaveAsDraft }) => {
   return (
      <div>
         <MuiDialog
            onClose={handleClose}
            open={open}
            PaperProps={{
               style: { width: '350px', padding: '10px 20px', overflow: 'hidden', borderRadius: '8px' },
            }}
            sx={{
               '& .MuiDialogContent-root': { padding: '10px 0px', marginTop: '12px' },
               '& .MuiBackdrop-root': { backgroundColor: 'rgba(0, 0, 0, 0.1)', borderBottom: 'unset' },
            }}
         >
            <DialogTitle sx={{ fontWeight: 'bold', m: 0, pt: 2, pb: 0, px: 0, height: '37px' }}>
               <InfoIcon sx={{ color: 'primary.main', fontSize: 28, transform: 'rotate(180deg)' }} />
               <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
                  <CloseIcon />
               </IconButton>
            </DialogTitle>
            <DialogContent>
               <>
                  <Typography fontWeight="bold" mb={2}>
                     Do you want to save as draft?
                  </Typography>
                  <Typography mb={2}>
                     Rquests in drafts would be deleted after 30 days of inactivity.
                  </Typography>
               </>
               <Box display="flex" gap={1} justifyContent="center">
                  <Button onClick={handleClose} variant="outlined">
                     Cancel
                  </Button>
                  <Button color="primary" onClick={handleSaveAsDraft} type="submit" variant="contained">
                     Confirm
                  </Button>
               </Box>
            </DialogContent>
         </MuiDialog>
      </div>
   );
};
export default React.memo(SaveAsDraftDialog);
