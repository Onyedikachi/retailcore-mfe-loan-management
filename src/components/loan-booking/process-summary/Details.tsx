import Dialog from '@app/components/atoms/Dialog';
import { Grid, Typography, styled } from '@mui/material';
import React from 'react';
import { CustomerInfoDialog } from '../customer-information/CustomerInfoDialoog';

export const ViewChip = styled(Typography)(() => ({
   marginLeft: '30px',
   padding: '6px',
   boxShadow: '1px 1px 3px 0px rgba(0, 0, 0, 0.25)',
   cursor: 'pointer',
   display: 'inline',
}));

interface DetailsProps {
   customerId?: string;
   title: string;
   details: {
      key: string;
      value: any;
      view?: boolean;
      heading?: string;
      file?: string;
   }[];
}

export const Details: React.FC<DetailsProps> = ({ title, details, customerId }) => {
   const [openDetailsModal, setOpenDetailsModal] = React.useState(false);

   return (
      <>
         <Typography mb={2} mt={3} fontWeight="bold">
            {title}
         </Typography>
         <>
            {details?.map(({ key, value, view, heading, file }) => (
               <>
                  {value && (
                     <>
                        {heading && (
                           <Typography pl={6} fontWeight="bold" mb={2} sx={{ textDecoration: 'underline' }}>
                              {heading}
                           </Typography>
                        )}
                        <Grid container pl={6} key={key}>
                           <Grid item xs={4} mb={2}>
                              <Typography> {key}</Typography>
                           </Grid>
                           <Grid item xs={8} mb={2}>
                              <Typography variant="body2">
                                 {value}
                                 {view && (
                                    <ViewChip variant="body2" onClick={() => setOpenDetailsModal(true)}>
                                       View
                                    </ViewChip>
                                 )}
                                 {file && (
                                    <ViewChip variant="body2" onClick={() => {}}>
                                       View
                                    </ViewChip>
                                 )}
                              </Typography>
                           </Grid>
                        </Grid>
                     </>
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
            <CustomerInfoDialog id={customerId} />
         </Dialog>
      </>
   );
};
