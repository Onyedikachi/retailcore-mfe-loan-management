import { Box } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const ValueIncrementDecrement: React.FC<{ formik: any; fieldName: string }> = ({ formik, fieldName }) => {
   return (
      <Box display="flex" flexDirection="column">
         <KeyboardArrowUpIcon
            sx={{ cursor: 'pointer' }}
            onClick={() => {
               const value = Number(formik.values[fieldName]);
               const newValue = value + 1;
               formik.setFieldValue(fieldName, newValue);
            }}
         />
         <KeyboardArrowDownIcon
            sx={{ marginTop: '-13px', cursor: 'pointer' }}
            onClick={() => {
               const value = Number(formik.values[fieldName]);
               const newValue = value > 0 ? value - 1 : value;
               formik.setFieldValue(fieldName, newValue);
            }}
         />
      </Box>
   );
};

export default ValueIncrementDecrement;
