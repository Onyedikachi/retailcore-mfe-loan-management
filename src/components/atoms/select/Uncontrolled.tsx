import { FormControl, Select, SelectProps as MuiSelectProps, styled, MenuItem } from '@mui/material';
import { Colors } from '@app/constants/colors';
import { SelectPlaceholder } from './Placeholder';

const StyledSelect = styled(Select)(({ variant }) => ({
   ...(variant === 'standard' && {
      '&::placeholder': { color: Colors.LightGray4 },
      '&:focus': { borderBottomColor: 'red', background: 'transparent' },
   }),
   ...(variant === 'outlined' && {
      '& fieldset': {
         border: `1px solid ${Colors.BgCardGray} !important`,
      },
   }),
   '.MuiSelect-icon': {
      fontSize: '30px',
   },
}));

interface SelectProps extends MuiSelectProps {
   name: string;
   padding?: string;
   options: string[];
   placeholder: string;
}

export const UncontrolledSelect: React.FC<SelectProps> = (props) => {
   return (
      <FormControl fullWidth>
         <StyledSelect
            variant="outlined"
            id={props.name}
            {...props}
            defaultValue=""
            displayEmpty
            renderValue={(value: unknown) => value || <SelectPlaceholder text={props.placeholder} />}
         >
            {props.options.map((option) => (
               <MenuItem value={option} key={option}>
                  {option}
               </MenuItem>
            ))}
         </StyledSelect>
      </FormControl>
   );
};
