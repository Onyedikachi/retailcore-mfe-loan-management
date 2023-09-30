import { AccordionVariant } from '@app/components/accordion/Accordion';
import { styled, FormControlLabel as MuiFormControlLabel, Checkbox, Box } from '@mui/material';
import { Colors } from '@app/constants/colors';
import { FormControlBase } from '@app/components/forms/FormControl';
import { useFormikContext } from 'formik';
import React from 'react';

const FormControlLabel = styled(MuiFormControlLabel)({
   '& .MuiSvgIcon-root': { color: Colors.Primary, marginLeft: 2 },
   '& .MuiCheckbox-root .MuiSvgIcon-root': { fontSize: 22, marginLeft: 2 },
});
export const TabContent: React.FC<{ name: string; options: string[] }> = ({ name, options }) => {
   return (
      <>
         <AccordionVariant
            accordionLabels={
               [<CheckboxHeader key={'jkll'} name={name} label={'jkll'} options={options} />]
               // assetsCheckbox(name, [options, []])
            }
         >
            <Box
               ml={3}
               sx={{
                  '& .MuiTypography-root': { fontSize: 12 },
                  '& .MuiSvgIcon-root': { color: Colors.Primary },
                  '& .MuiCheckbox-root': { padding: '0px 4px' },
               }}
            >
               <FormControlBase control="checkboxGroup" name={name} options={options} />
            </Box>
            <></>
         </AccordionVariant>
      </>
   );
};

interface CheckboxHeaderProps {
   label: string;
   name: string;
   options: string[];
}

const CheckboxHeader = ({ label, name, options }: CheckboxHeaderProps) => {
   const { getFieldProps, setFieldValue } = useFormikContext();
   let selected = getFieldProps(name).value;
   let itemCount = options.length;
   const [checked, setChecked] = React.useState(false);

   return (
      <FormControlLabel
         label={label}
         sx={{ ml: 0.1 }}
         control={
            <Checkbox
               checked={selected.length == itemCount && itemCount > 0}
               indeterminate={selected.length > 0 && selected.length < itemCount}
               onChange={(e) => {
                  setChecked((prev) => !prev);
                  const filtered = selected.filter((item: string) => !options.includes(item));
                  const allChecked = checked ? options : filtered;
                  const newChecked = Array.from(new Set([...selected, ...allChecked]));
                  setFieldValue(name, newChecked);
               }}
            />
         }
         onClick={(event) => event.stopPropagation()}
      />
   );
};
const assetsCheckbox = (name: string, optionsList: string[][]) =>
   checkBoxHeader.map(({ label }, index) => (
      <CheckboxHeader key={label} name={name} label={label} options={optionsList[index]} />
   ));

const checkBoxHeader = [{ label: 'Current Assets [ASTCAS]' }, { label: 'Non Current Asets' }];
