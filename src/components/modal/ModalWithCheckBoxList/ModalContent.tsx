import React from 'react';
import { Box, Divider, styled, Typography } from '@mui/material';
import { Button } from '../../atoms/Button';
import { SearchInput } from '../../atoms/SearchInput';
import { ListWithChildren } from './ListWithChildren';
import AddIcon from '@mui/icons-material/Add';
import { Colors } from '@app/constants';

const AddNewChargeBox = styled(Box)({
   cursor: 'pointer',
   width: '100%',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'flex-end',
   borderRadius: 4,
   padding: 1,
});

const AddIconBackground = styled(Box)({
   backgroundColor: Colors.TextGray,
   borderRadius: '50%',
   marginRight: '5px',
   width: 'auto',
   height: '25px',
});

const CreateNewChargeText = styled(Typography)({
   fontFamily: 'Roboto',
   fontSize: 15,
   fontWeight: 400,
   lineHeight: '18px',
   letterSpacing: '0em',
   textAlign: 'left',
   color: Colors.TextGray,
});

interface ModalContentProps {
   handleSearch: (searchBy: string) => void;
   onSubmitClick: () => void;
   initialListData: {
      labelName: string;
      checked: boolean;
      children: { name: string; checked: boolean }[];
   }[];
   onCheckboxToggle: (labelName: string) => void;
   onChildCheckboxToggle: (labelName: string, childIndex: number) => void;
   addButtonText: string;
   modalHeader: React.ReactNode;
}

const ModalContent: React.FC<ModalContentProps> = ({
   handleSearch,
   onSubmitClick,
   initialListData,
   onCheckboxToggle,
   onChildCheckboxToggle,
   addButtonText,
   modalHeader,
}) => {
   return (
      <Box
         sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
         }}
      >
         {modalHeader}
         <Divider sx={{ my: 2 }} />

         <SearchInput handleSearch={handleSearch} placeholder="Search words..." />

         <Box mt={2} display="flex" alignItems="center">
            <AddNewChargeBox onClick={onSubmitClick}>
               <AddIconBackground>
                  <AddIcon sx={{ color: 'white' }} />
               </AddIconBackground>
               <CreateNewChargeText>{addButtonText}</CreateNewChargeText>
            </AddNewChargeBox>
         </Box>

         <ListWithChildren
            listData={initialListData}
            onCheckboxToggle={onCheckboxToggle}
            onChildCheckboxToggle={onChildCheckboxToggle}
         />

         <Box mt={2} display="flex" justifyContent="center">
            <Button variant="contained" color="primary" onClick={onSubmitClick}>
               Add
            </Button>
         </Box>
      </Box>
   );
};

export default ModalContent;
