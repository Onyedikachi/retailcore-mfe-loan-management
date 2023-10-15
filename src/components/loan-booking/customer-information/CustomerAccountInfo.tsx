import { Button } from '@app/components/atoms';
import Dialog from '@app/components/atoms/Dialog';
import { StatusIndicator } from '@app/components/atoms/StatusIndicator';
import { Box, Chip, Grid, Typography } from '@mui/material';
import React from 'react';
import { CustomerInfoDialog } from './CustomerInfoDialoog';
import { useBookLoanContext } from '@app/providers/book-loan';
import { customerInfo, riskStatusColor, colors } from './customer-info-data';

export const CustomerAccountInformation: React.FC = () => {
   const [openDetailsModal, setOpenDetailsModal] = React.useState(false);
   const { selectedCustomer, selectedCustomerId } = useBookLoanContext();

   return (
      <Box sx={{ bgcolor: '#AAAAAA12', p: 3, borderRadius: '8px', boxShadow: '0 1px 4px 0 #00000025' }}>
         <Typography variant="h4">Customer’s Information</Typography>
         <Grid container>
            {customerInfo(selectedCustomer!).map(({ key, value }, index) => (
               <Grid item xs={3} mt={3} key={key + index}>
                  <Typography fontWeight="bold">{key}</Typography>
                  <Typography
                     color={
                        key == 'Customer Persona'
                           ? 'info.main'
                           : key == 'Risk Status'
                           ? riskStatusColor(value)
                           : 'inherit'
                     }
                  >
                     {key == 'Status' ? (
                        <Chip
                           component="span"
                           sx={{ p: 0, borderRadius: '4px', ...(value == 'Active' ? colors[0] : colors[1]) }}
                           label={value}
                        />
                     ) : key == 'KYC Status' ? (
                        <>
                           {value && (
                              <StatusIndicator
                                 sx={{
                                    color: value == 'Complete' ? 'success.main' : colors[1],
                                    width: '13px',
                                    height: '13px',
                                    ml: 0,
                                    mr: 1,
                                 }}
                              />
                           )}
                           {value}
                        </>
                     ) : (
                        value
                     )}
                  </Typography>
                  {index == 0 && (
                     <Typography>
                        <Button
                           variant="text"
                           color="success"
                           sx={{ p: 0, textTransform: 'initial', fontSize: 12, textDecoration: 'underline' }}
                           onClick={() => setOpenDetailsModal(true)}
                        >
                           View all customer information
                        </Button>
                     </Typography>
                  )}
               </Grid>
            ))}
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
