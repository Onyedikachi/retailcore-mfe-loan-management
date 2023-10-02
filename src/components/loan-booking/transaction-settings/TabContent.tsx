import { AccordionVariant } from '@app/components/accordion/Accordion';
import { styled, FormControlLabel as MuiFormControlLabel, Checkbox, Box } from '@mui/material';
import { Colors } from '@app/constants/colors';
import { FormControlBase } from '@app/components/forms/FormControl';
import { useFormikContext } from 'formik';
import React, { useCallback, useEffect } from 'react';

const FormControlLabel = styled(MuiFormControlLabel)({
   '& .MuiSvgIcon-root': { color: Colors.Primary, marginLeft: 2 },
   '& .MuiCheckbox-root .MuiSvgIcon-root': { fontSize: 22, marginLeft: 2 },
});

export const TabContent: React.FC<{ name: string; options: string[] }> = ({ name, options }) => {
   return (
      <>
         <AccordionVariant accordionLabels={assetsCheckbox(name, [options, []])}>
            <Box
               ml={3}
               sx={{
                  fontSize: 12,
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
   const selected = getFieldProps(name).value as Array<string>;
   const [checked, setChecked] = React.useState(false);
   const computedOptions = options.length ? options : [label];
   
   const handleCheck = useCallback(() => {
      const newState = !checked;
      const newCheckedItems = newState
         ? Array.from(new Set([...selected, ...computedOptions]))
         : selected?.filter((item) => !computedOptions.includes(item));

      setFieldValue(name, newCheckedItems);
      setChecked(newState);
   }, [checked, selected, setFieldValue]);

   useEffect(() => {
      setChecked(computedOptions.every((option) => selected.includes(option)));
   }, [selected, setChecked]);

   const indeterminate =
      computedOptions.some((option) => selected.includes(option)) &&
      !computedOptions.every((option) => selected.includes(option));

   return (
      <FormControlLabel
         label={label}
         sx={{ ml: 0.1 }}
         control={<Checkbox checked={checked} indeterminate={indeterminate} onChange={handleCheck} />}
         onClick={(event) => event.stopPropagation()}
      />
   );
};
const assetsCheckbox = (name: string, optionsList: string[][]) =>
   checkBoxHeader.map(({ label }, index) => (
      <CheckboxHeader key={label} name={name} label={label} options={optionsList[index]} />
   ));

const checkBoxHeader = [{ label: 'Current Assets [ASTCAS]' }, { label: 'Non Current Asets' }];
