import { Button } from '@mui/material';
import { AddButton } from '../atoms/AddButton';
import { FormControlBase } from './FormControl';
import FormControlWrapper from './FormControlWrapper';
import { useFormikContext } from 'formik';
interface AutocompleteWithCheckBoxControlProps {
   name: string;
   label: string;
   placeholder?: string;
   options: any;
   layout?: 'horizontal' | 'vertical' | undefined;
   addButtonText: string;
   applyButtonText: string;
   handleAddButton: () => void;
   handleApplyButton: () => void;
   extras?: React.ReactNode;
}
export const AutocompleteWithCheckBoxControl: React.FC<AutocompleteWithCheckBoxControlProps> = (props) => {
   const { getFieldProps } = useFormikContext();
   return (
      <FormControlWrapper
         name={props.name}
         label={props.label}
         layout={props.layout ?? 'horizontal'}
         sx={{ mb: 3 }}
      >
         <FormControlBase
            sx={{ pr: 6 }}
            control="autocomplete"
            placeholder={props.placeholder ?? 'Type to search and select'}
            name={props.name}
            noOptionsText="No match"
            options={props.options}
            checkbox
            search
            multiple
            disableCloseOnSelect
            extras={props.extras}
            addButton={
               <AddButton
                  color="primary"
                  text={props.addButtonText}
                  onMouseDown={(event) => {
                     event.stopPropagation();
                     props.handleAddButton();
                  }}
               />
            }
            applyButton={
               <Button
                  color={getFieldProps(props.name).value?.length > 0 ? 'primary' : 'inherit'}
                  variant="text"
                  sx={{ textDecoration: 'underline', textTransform: 'initial' }}
                  onMouseDown={(event) => {
                     event.stopPropagation();
                     props.handleApplyButton();
                  }}
               >
                  {props.applyButtonText}
               </Button>
            }
         />
      </FormControlWrapper>
   );
};
