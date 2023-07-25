import { Button, SearchInput } from '@app/components/atoms';
import Checkbox from '@app/components/atoms/Checkbox';
import { DocumentFomat } from '@app/constants';
import { Box, List, ListItem, FormControl, FormControlLabel, FormGroup } from '@mui/material';
import React, { useState } from 'react';

interface AddDocumentFormatProps {
   selectAddDocumentFormat?: string[];
   handleSelected: (selected: string[]) => void;
}
const AddDocumentFormat: React.FC<AddDocumentFormatProps> = ({ handleSelected, selectAddDocumentFormat }) => {
   const [items, setItems] = React.useState(DocumentFomat);
   const [checkedItems, setCheckedItems] = useState<Array<string>>(selectAddDocumentFormat ?? []);

   const handleChange = ({ target: { checked, name } }: React.ChangeEvent<HTMLInputElement>) => {
      let _checkItems = [...checkedItems];
      if (checked) {
         _checkItems.push(name);
      } else {
         _checkItems = checkedItems.filter((item) => item !== name);
      }
      setCheckedItems(_checkItems);
   };

   return (
      <Box sx={{ py: 1, borderRadius: '5px' }}>
         <Box sx={{ px: 2 }}>
            <Box py={2}>
               <SearchInput
                  placeholder="Search"
                  handleSearch={(searchText) => {
                     searchText
                        ? setItems(
                             items.filter((item) => item.toLowerCase().includes(searchText.toLowerCase()))
                          )
                        : setItems(DocumentFomat);
                  }}
               />
            </Box>
         </Box>
         <Box sx={{ overflow: 'auto' }}>
            <List sx={{ px: 2 }}>
               <FormControl component="fieldset">
                  <FormGroup>
                     {items.map((option, index) => (
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
                                    onChange={(e) => handleChange(e)}
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
         <Box textAlign="center">
            <Button
               color="primary"
               disabled={checkedItems.length < 1}
               onClick={() => handleSelected(checkedItems)}
            >
               Add
            </Button>
         </Box>
      </Box>
   );
};

export default AddDocumentFormat;
