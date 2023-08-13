import { Button } from '@app/components/atoms';
import Dialog from '@app/components/atoms/Dialog';
import { StatusIndicator } from '@app/components/atoms/StatusIndicator';
import { Colors } from '@app/constants/colors';
import { Box, Chip, Grid, Typography } from '@mui/material';
import React from 'react';
import { CustomerInfoDialog } from './CustomerInfoDialoog';

export const CustomerAccountInformation: React.FC = () => {
   const [openDetailsModal, setOpenDetailsModal] = React.useState(false);
   return (
      <Box sx={{ bgcolor: '#AAAAAA12', p: 3, borderRadius: '8px', boxShadow: '0 1px 4px 0 #00000025' }}>
         <Typography variant="h4">Customer’s Information</Typography>
         <Grid container>
            {customerInfo.map(({ key, value }, index) => (
               <Grid item xs={3} mt={3} key={key + index}>
                  <Typography fontWeight="bold">{key}</Typography>
                  <Typography
                     color={
                        key == 'Customer Persona'
                           ? 'info.main'
                           : key == 'Risk Status'
                           ? riskStatusColor(value)
                           : 'initial'
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
                           <StatusIndicator
                              sx={{
                                 color: value == 'Complete' ? 'success.main' : colors[1],
                                 width: '13px',
                                 height: '13px',
                                 ml: 0,
                                 mr: 1,
                              }}
                           />
                           {value}
                        </>
                     ) : (
                        value
                     )}
                  </Typography>
                  {key == customerInfo[0].key && (
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
            <CustomerInfoDialog />
         </Dialog>
      </Box>
   );
};

const customerInfo = [
   { key: 'Customer Name', value: 'Temitope Yusuf Chukwuma' },
   { key: 'Customer ID', value: '0445678901' },
   { key: 'Customer Type', value: 'Individual' },
   { key: 'Status', value: 'Active' },
   { key: 'BVN', value: '22234567856' },
   { key: 'Phone Number', value: '08012345678' },
   { key: 'Email Address', value: 'samuelyusuf@email.com' },
   { key: 'Customer Persona', value: 'High Net-Worth' },
   { key: 'KYC Status', value: 'Complete' },
   { key: 'Risk Status', value: 'LOW' },
   { key: 'Relationship Manager', value: 'Iyke David' },
   { key: 'Email Address', value: 'samuelyusuf@email.com' },
];
const colors = [
   { color: Colors.DarkGreen, bgcolor: Colors.BgCardSuccess },
   { color: Colors.DarKRed, bgcolor: Colors.BgCardRed },
   { color: '#806B00', bgcolor: '#FFF8CC' },
];
const riskStatusColor = (riskStatus: string) => {
   switch (riskStatus) {
      case 'LOW':
         return 'success.main';
      case 'MEDIUM':
         return colors[1].color;
      case 'HIGH':
         return 'primary.main';
      default:
         return colors[0].color;
   }
};
