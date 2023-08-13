import Accordion from '@app/components/accordion/Accordion';
import { Avatar, Typography, Grid, Box } from '@mui/material';
import React from 'react';

export const CustomerInfoDialog: React.FC = () => {
   return (
      <>
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

         <Accordion accordionLabels={['Biodata']}>
            {[
               <>
                  <Grid container ml={4}>
                     {customerInfo.map(({ key, value }, index) => (
                        <React.Fragment key={key + index}>
                           <Grid item xs={4} fontWeight="bold" mb={2}>
                              {key}
                           </Grid>
                           <Grid item xs={8} mb={2}>
                              {value}
                           </Grid>
                        </React.Fragment>
                     ))}
                  </Grid>
               </>,
            ]}
         </Accordion>
      </>
   );
};

const customerInfo = [
   { key: 'Title', value: 'Mr' },
   { key: 'Surname', value: 'Chukwuma' },
   { key: 'First Name', value: 'Temitope' },
   { key: 'Other Names', value: 'Yusuf' },
   { key: 'Mother’s Maiden Name ', value: '-' },
   { key: 'Gender', value: 'Male' },
   { key: 'Marital Status', value: 'Single' },
];
