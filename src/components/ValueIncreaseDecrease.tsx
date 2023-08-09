import { Box, IconButton } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useFormikContext } from 'formik';

const ValueIncrementDecrement: React.FC<{ fieldName: string }> = ({ fieldName }) => {
   const { getFieldProps, setFieldValue } = useFormikContext();

   return (
      <Box display="flex" flexDirection="column">
         <IconButton
            sx={{ p: '0 5px' }}
            onClick={() => {
               const value = Number(getFieldProps(fieldName)?.value ?? 0);
               const newValue = value + 1;
               setFieldValue(fieldName, newValue);
            }}
         >
            <KeyboardArrowUpIcon sx={{ cursor: 'pointer' }} />
         </IconButton>
         <IconButton
            sx={{ p: '0 5px', marginTop: '-13px' }}
            onClick={() => {
               const value = Number(getFieldProps(fieldName)?.value ?? 0);
               const newValue = value > 0 ? value - 1 : value;
               setFieldValue(fieldName, newValue);
            }}
         >
            <KeyboardArrowDownIcon sx={{ cursor: 'pointer' }} />
         </IconButton>
      </Box>
   );
};

export default ValueIncrementDecrement;
