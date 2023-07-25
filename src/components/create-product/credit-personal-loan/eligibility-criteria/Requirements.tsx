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
import React, { useEffect, useState } from 'react';
import CreateOtherRequirement from './CreateOtherRequirement';
import Dialog from '@app/components/atoms/Dialog';
import { useOtherRequirementContext } from '@app/providers/eligibility-criteria-other-requirement-provider';
import { FormikProps } from 'formik';
import { useFormikCheckItems } from '@app/hooks/useFormikCheckItems';
import * as FormMeta from '@app/utils/validators/personal-loan/eligibility-criteria';
import { OtherRequirementDocument } from '@app/@types/create-credit-product';

const Requirements: React.FC<{ formik: FormikProps<any> }> = ({ formik }) => {
   const { allRequirements, handleSelectRequirement, selectedRequirements } = useOtherRequirementContext();
   const { InputFieldNames } = FormMeta;
   const [requirement, setRequirement] = useState<OtherRequirementDocument[]>(allRequirements);

   const [openCreateRequirement, setOpenCreateRequirement] = React.useState(false);
   const { checkedItems, itemToggle, updateFormikState } = useFormikCheckItems(
      allRequirements,
      selectedRequirements,
      'title',
      {
         formik,
         fieldBaseName: InputFieldNames.OTHER_REQUIREMENT_VALUES,
      }
   );

   const handleChange = ({ target: { name } }: React.ChangeEvent<HTMLInputElement>) => {
      itemToggle(name);
   };

   useEffect(() => {
      handleSelectRequirement(checkedItems);
      updateFormikState('id', { indexKey: 'id' });
   }, [checkedItems]);

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
                     {requirement?.map(({ title }, index) => (
                        <ListItem
                           sx={{
                              p: 0,
                              '& .MuiFormControlLabel-label': { fontSize: '14px', fontWeight: 'normal' },
                           }}
                           key={title + index}
                        >
                           <FormControlLabel
                              control={
                                 <Checkbox
                                    sx={{ mr: 1 }}
                                    checked={
                                       !!checkedItems.find(
                                          ({ title: checkedTitle }) => checkedTitle === title
                                       )
                                    }
                                    onChange={handleChange}
                                    name={title}
                                 />
                              }
                              label={title}
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
