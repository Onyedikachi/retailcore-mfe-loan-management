import { CustomerData } from '@app/@types/customer';
import Accordion from '@app/components/accordion/Accordion';
import { CUSTOMER_MANAGEMENT_PATH } from '@app/constants';
import { Avatar, Typography, Grid, Box } from '@mui/material';
import { FC, Fragment, useState } from 'react';
import { useRequest } from 'react-http-query';
import PersonIcon from '@mui/icons-material/Person';
import { customerInfo } from './full-customer-info-data';

export const CustomerInfoDialog: FC<{ id?: string }> = ({ id }) => {
   const [details, setDetails] = useState<CustomerData>();
   const { GET_CUSTOMER } = CUSTOMER_MANAGEMENT_PATH;
   const labels = ['Biodata', 'Identity Verification', 'Contact Information', 'Details of Next of Kin'];
   const profile = details?.customer_profiles?.[0];

   useRequest(
      {
         onMount: (makeRequest) => {
            makeRequest(`${GET_CUSTOMER}/${id}`, { showSuccess: false });
         },
         onSuccess: (response) => setDetails(response.data.data),
      },
      [id]
   );

   return (
      <Box width="98%" mx="auto">
         {details ? (
            <>
               <Box display="flex" alignItems="center" mb={4}>
                  {profile?.customersPhoto ? (
                     <Avatar
                        alt="customersPhoto"
                        sx={{ width: '100px', height: '100px' }}
                        src={profile?.customersPhoto}
                     />
                  ) : (
                     <Avatar sx={{ width: '100px', height: '100px' }}>
                        <PersonIcon sx={{ width: '94px', height: '90px' }} />
                     </Avatar>
                  )}

                  <Box ml={3}>
                     <Typography variant="h5">
                        {`${profile?.firstName} ${profile?.otherNames ?? ''} ${profile?.surname}`}
                     </Typography>
                     <Typography mt={1}>
                        <Typography component="span" fontWeight="bold">
                           ID:
                        </Typography>
                        {profile?.customerNumber}
                     </Typography>
                  </Box>
               </Box>

               <Accordion accordionLabels={labels}>
                  {Object.values(customerInfo(details)).map((value) => (
                     <Grid container ml={4} key={value[0].key + value[0].value}>
                        {value.map(({ key, value }) => (
                           <Fragment key={key}>
                              <Grid item xs={5} fontWeight="bold" mb={2}>
                                 {key}
                              </Grid>
                              <Grid item xs={7} mb={2} pl={2}>
                                 {value ?? '-'}
                              </Grid>
                           </Fragment>
                        ))}
                     </Grid>
                  ))}
               </Accordion>
            </>
         ) : (
            <></>
         )}
      </Box>
   );
};
