import Dialog from '@app/components/atoms/Dialog';
import { Grid, Typography } from '@mui/material';
import React from 'react';
import { CustomerInfoDialog } from '../customer-information/CustomerInfoDialoog';

interface DetailsProps {
   title: string;
   details: {
      key: string;
      value: string;
      view?: boolean;
   }[];
}

export const Details: React.FC<DetailsProps> = ({ title, details }) => {
   const [openDetailsModal, setOpenDetailsModal] = React.useState(false);
   return (
      <>
         <Typography mb={2} mt={3}>
            {title}
         </Typography>
         <Grid container pl={6}>
            {details.map(({ key, value, view }, index) => (
               <React.Fragment key={key + index}>
                  <Grid item xs={4} fontWeight="bold" mb={2}>
                     <Typography> {key}</Typography>
                  </Grid>
                  <Grid item xs={8} mb={2}>
                     <Typography variant="body2">
                        {value}
                        {view && (
                           <Typography
                              variant="body2"
                              component="span"
                              sx={{
                                 ml: 3,
                                 p: 0.7,
                                 boxShadow: '1px 1px 3px 0px rgba(0, 0, 0, 0.25)',
                                 cursor: 'pointer',
                              }}
                              onClick={() => setOpenDetailsModal(true)}
                           >
                              View
                           </Typography>
                        )}
                     </Typography>
                  </Grid>
               </React.Fragment>
            ))}
         </Grid>
         <Dialog
            minHeight="80%"
            open={openDetailsModal}
            handleClose={() => setOpenDetailsModal(false)}
            title="Customer's Information"
         >
            <CustomerInfoDialog />
         </Dialog>
      </>
   );
};
