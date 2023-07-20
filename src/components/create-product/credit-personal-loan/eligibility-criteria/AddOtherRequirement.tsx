import { SearchInput } from '@app/components/atoms';
import DragContainer from '@app/components/atoms/DragContainer';
import { Colors } from '@app/constants';
import { Box, Divider, Grid, List, ListItem, Typography } from '@mui/material';

interface AddOtherRequirementsProps {
   requirements: [];
}
const AddOtherRequirements: React.FC<AddOtherRequirementsProps> = () => {
   return (
      <Grid container>
         <Grid item xs={4} pr={5}>
            <Requirements />
         </Grid>
         <Grid item xs={8}>
            oopo
         </Grid>
      </Grid>
   );
};

export default AddOtherRequirements;

const Requirements: React.FC = () => {
   return (
      <Box sx={{ border: `1px solid ${Colors.LightGray}`, py: 1,  borderRadius: '5px' }}>
         <Box  sx={{px: 2}}>
         <Typography fontWeight="bold">Drag & Drop Requirements</Typography>
         <Divider sx={{ mt: 0.5, width: '80%' }} />
         <Box py={2}>
            <SearchInput placeholder="Search" handleSearch={(searchBy) => {}} />
         </Box>
         </Box>
         <Box sx={{height: '400px',overflow: 'auto' }}>
            <List className='fancy-scrollbar' sx={{px:2}} >
               {dummyRequirements.map((item, index) => (
                  <ListItem sx={{p:0}} key={index}>
                     <DragContainer key={index} text={item} />
                  </ListItem>
               ))}
            </List>
         </Box>
      </Box>
   );
};

const dummyRequirements = [
   'Account Ownership',
   'Income Bracket',
   'Pay Slip',
   'Period of Employment',
   'Salaries and Emoluments',
   'Credit Insurance',
   'Employer',
   'Letter of Employment',
   'Letter of Undertaking',
   'Life Insurance Policy',
   'Proof of Income',
   'Reputable Firm Affliation',
];
