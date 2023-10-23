import Dialog from '@app/components/atoms/Dialog';
import { Grid, Typography } from '@mui/material';
import React from 'react';
import { CustomerInfoDialog } from '../customer-information/CustomerInfoDialoog';
import { useBookLoanContext } from '@app/providers/book-loan';

interface DetailsProps {
   customerId?: string;
   title: string;
   details: {
      key: string;
      value?: string | number;
      view?: boolean;
   }[];
}

export const Details: React.FC<DetailsProps> = ({ title, details, customerId }) => {
   const [openDetailsModal, setOpenDetailsModal] = React.useState(false);
   const { selectedCustomerId } = useBookLoanContext();

   return (
      <>
         <Typography mb={2} mt={3}>
            {title}
         </Typography>
         <>
            {details?.map(({ key, value, view }, index) => (
               <>
                  {value && (
                     <Grid container pl={6} key={key}>
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
                     </Grid>
                  )}
               </>
            ))}
         </>
         <Dialog
            minHeight="80%"
            open={openDetailsModal}
            handleClose={() => setOpenDetailsModal(false)}
            title="Customer's Information"
         >
            <CustomerInfoDialog id={customerId ?? selectedCustomerId} />
         </Dialog>
      </>
   );
};
