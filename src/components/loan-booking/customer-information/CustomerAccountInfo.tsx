import { Button } from '@app/components/atoms';
import Dialog from '@app/components/atoms/Dialog';
import { Box, Grid, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { CustomerInfoDialog } from './CustomerInfoDialog';
import { useBookLoanContext } from '@app/providers/book-loan';
import { customerInfo, riskStatusColor } from './customer-info-data';

export const CustomerAccountInformation: React.FC = () => {
   const [openDetailsModal, setOpenDetailsModal] = React.useState(false);
   const { selectedCustomer, selectedCustomerId, persona } = useBookLoanContext();
   const info = useMemo(() => customerInfo(selectedCustomer!, persona), [selectedCustomer, persona]);

   return (
      <Box sx={{ bgcolor: '#AAAAAA12', p: 3, borderRadius: '8px', boxShadow: '0 1px 4px 0 #00000025' }}>
         <Typography variant="h4">Customer’s Information</Typography>
         <Grid container>
            {info.map(({ key, value }, index) => {
               let color;
               if (key == 'Customer Persona') {
                  color = 'info.main';
               } else if (key == 'Risk Status') {
                  color = riskStatusColor(value as string);
               } else {
                  color = 'inherit';
               }
               return (
                  <Grid item xs={3} mt={3} key={key} pr={1.5}>
                     <Typography fontWeight="bold">{key}</Typography>
                     <Typography color={color}>{value || '-'}</Typography>
                     {index == 0 && (
                        <Typography>
                           <Button
                              variant="text"
                              color="success"
                              sx={{
                                 p: 0,
                                 textTransform: 'initial',
                                 fontSize: 12,
                                 textDecoration: 'underline',
                              }}
                              onClick={() => setOpenDetailsModal(true)}
                           >
                              View all customer information
                           </Button>
                        </Typography>
                     )}
                  </Grid>
               );
            })}
         </Grid>
         <Dialog
            minHeight="80%"
            open={openDetailsModal}
            handleClose={() => setOpenDetailsModal(false)}
            title="Customer's Information"
         >
            <CustomerInfoDialog id={selectedCustomerId} />
         </Dialog>
      </Box>
   );
};
