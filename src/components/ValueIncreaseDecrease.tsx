import { Box, IconButton } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const ValueIncrementDecrement: React.FC<{ formik: any; fieldName: string }> = ({ formik, fieldName }) => {
   return (
      <Box display="flex" flexDirection="column">
         <IconButton
            sx={{ p: '0 5px' }}
            onClick={() => {
               const value = Number(formik.getFieldProps(fieldName)?.value ?? 0);
               const newValue = value + 1;
               formik.setFieldValue(fieldName, newValue);
            }}
         >
            <KeyboardArrowUpIcon sx={{ cursor: 'pointer' }} />
         </IconButton>
         <IconButton
            sx={{ p: '0 5px', marginTop: '-13px' }}
            onClick={() => {
               const value = Number(formik.getFieldProps(fieldName)?.value ?? 0);
               const newValue = value > 0 ? value - 1 : value;
               formik.setFieldValue(fieldName, newValue);
            }}
         >
            <KeyboardArrowDownIcon sx={{ cursor: 'pointer' }} />
         </IconButton>
      </Box>
   );
};

export default ValueIncrementDecrement;
