import Accordion from '@app/components/accordion/Accordion';
import { Avatar, Typography, Grid, Box } from '@mui/material';
import React from 'react';

export const CustomerInfoDialog: React.FC = () => {
   const labels = [
      'Biodata',
      'Identity Verification',
      'Contact Information',
      'Details of Next of Kin',
      'Documentation',
   ];

   return (
      <Box width="98%" mx="auto">
         <Box display="flex" alignItems="center" mb={4}>
            <Avatar
               alt="photo"
               sx={{ width: '152px', height: '148px' }}
               src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
            />
            <Box ml={3}>
               <Typography variant="h5">Temitope Yusuf Chukwuma</Typography>
               <Typography mt={1}>
                  <Typography component="span" fontWeight="bold">
                     ID:
                  </Typography>
                  1000222456
               </Typography>
            </Box>
         </Box>

         <Accordion accordionLabels={labels}>
            {Object.values(customerInfo).map((value) => (
               <Grid container ml={4} key={value[0].key + value[0].value}>
                  {value.map(({ key, value }) => (
                     <React.Fragment key={key}>
                        <Grid item xs={4} fontWeight="bold" mb={2}>
                           {key}
                        </Grid>
                        <Grid item xs={8} mb={2}>
                           {value}
                        </Grid>
                     </React.Fragment>
                  ))}
               </Grid>
            ))}
         </Accordion>
      </Box>
   );
};

const customerInfo = {
   biodata: [
      { key: 'Title', value: 'Mr' },
      { key: 'Surname', value: 'Chukwuma' },
      { key: 'First Name', value: 'Temitope' },
      { key: 'Other Names', value: 'Yusuf' },
      { key: 'Mother’s Maiden Name ', value: '-' },
      { key: 'Gender', value: 'Male' },
      { key: 'Marital Status', value: 'Single' },
      { key: 'Date of Birth ', value: '-' },
      { key: 'Country', value: 'Male' },
      { key: 'State of Origin', value: 'Single' },
      { key: 'LGA', value: 'Single' },
      { key: 'Country', value: 'Male' },
      { key: 'State of Origin', value: 'Single' },
      { key: 'Dual Citizen', value: 'No' },
      { key: 'If yes specify:', value: 'No' },
   ],
   idVerification: [
      { key: 'BVN', value: 'Mr' },
      { key: 'Choose an ID', value: 'Chukwuma' },
      { key: 'ID Number', value: 'Temitope' },
      { key: 'Issue Date', value: 'Yusuf' },
      { key: 'Expiry Date', value: '-' },
   ],
   contactInfo: [
      { key: 'Residential Address', value: 'Mr' },
      { key: 'Detailed Address Description', value: 'Chukwuma' },
      { key: 'Country', value: 'Temitope' },
      { key: 'State', value: 'Yusuf' },
      { key: 'City/Town', value: '-' },
      { key: 'LGA', value: 'Male' },
      { key: 'Mobile Number', value: 'Single' },
      { key: 'Alternative Phone Number', value: '-' },
      { key: 'Email Address', value: 'Male' },
      { key: 'Mail Address is the same as residential Address', value: 'Single' },
   ],
   nextOfKin: [
      { key: 'Title', value: 'Mr' },
      { key: 'Surname', value: 'Chukwuma' },
      { key: 'First Name', value: 'Temitope' },
      { key: 'Other Names', value: 'Yusuf' },
      { key: 'Relationship', value: '-' },
      { key: 'Gender', value: 'Male' },
      { key: 'Date of Birth ', value: '-' },
      { key: 'Residential Address', value: 'Male' },
   ],
};
