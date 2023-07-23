import { SearchInput } from '@app/components/atoms';
import Checkbox from '@app/components/atoms/Checkbox';
import { Icon } from '@app/components/atoms/Icon';
import { Colors } from '@app/constants';
import {
   Typography,
   Box,
   Divider,
   List,
   ListItem,
   Button,
   FormControl,
   FormControlLabel,
   FormGroup,
} from '@mui/material';
import React, { useState } from 'react';
import CreateOtherRequirement from './CreateOtherRequirement';
import Dialog from '@app/components/atoms/Dialog';
import { useOtherRequirementContext } from '@app/providers/eligibility-criteria-other-requirement-provider';
import { ObjectAny } from '@app/@types';

const Requirements: React.FC = () => {
   const { allRequirements, selectedRequirements, handleSelectRequirement } =
      useOtherRequirementContext();

   const [requirement, setRequirement] = useState<ObjectAny[]>(allRequirements);
   
   const [checkedItems, setCheckedItems] = useState<string[]>(selectedRequirements?.map((e) => e.name) ?? []);
   const [openCreateRequirement, setOpenCreateRequirement] = React.useState(false);
   const handleChange = ({ target: { checked, name } }: React.ChangeEvent<HTMLInputElement>) => {
      let _checkItems = [...checkedItems];
      if (checked) {
         _checkItems.push(name);
      } else {
         _checkItems = checkedItems.filter((item) => item !== name);
      }
      handleSelectRequirement(requirement.filter((e) => _checkItems.includes(e.title)));
      setCheckedItems(_checkItems);
   };

   const handleSearch = (searchText: string) => {
      searchText
         ? setRequirement(
              allRequirements.filter((item) => item.title.toLowerCase().includes(searchText.toLowerCase()))
           )
         : setRequirement(allRequirements);
   };
   return (
      <Box sx={{ border: `1px solid ${Colors.LightGray}`, py: 1, borderRadius: '5px' }}>
         <Box sx={{ px: 2 }}>
            <Typography fontWeight="500">Select Requirements</Typography>
            <Divider sx={{ mt: 0.5, width: '80%' }} />
            <Box py={2}>
               <SearchInput placeholder="Search" handleSearch={handleSearch} />
            </Box>
         </Box>
         <Box sx={{ height: '400px', overflow: 'auto' }}>
            <List sx={{ px: 2 }}>
               <FormControl component="fieldset">
                  <FormGroup>
                     {requirement
                        .map((e) => e.title)
                        .map((option, index) => (
                           <ListItem
                              sx={{
                                 p: 0,
                                 '& .MuiFormControlLabel-label': { fontSize: '14px', fontWeight: 'normal' },
                              }}
                              key={option + index}
                           >
                              <FormControlLabel
                                 control={
                                    <Checkbox
                                       sx={{ mr: 1 }}
                                       checked={checkedItems.includes(option)}
                                       onChange={handleChange}
                                       name={option}
                                    />
                                 }
                                 label={option}
                              />
                           </ListItem>
                        ))}
                  </FormGroup>
               </FormControl>
            </List>
         </Box>
         <Button
            variant="text"
            onClick={() => setOpenCreateRequirement(true)}
            color="inherit"
            sx={{ p: 2, pb: 0, fontWeight: '500' }}
         >
            <Icon type="add-circle" sx={{ mr: 1 }} /> Create new requirements
         </Button>
         <Dialog
            minWidth="75%"
            open={openCreateRequirement}
            handleClose={() => setOpenCreateRequirement(false)}
            title="CREATE NEW REQUIREMENT"
         >
            <CreateOtherRequirement onCompleted={() => setOpenCreateRequirement(false)} />
         </Dialog>
      </Box>
   );
};

export default Requirements;
