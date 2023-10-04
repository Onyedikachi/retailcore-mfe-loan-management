import { Colors } from '@app/constants/colors';
import { Checkbox, FormControlLabel as MuiFormControlLabel, styled } from '@mui/material';
import { useFormikContext } from 'formik';
import React, { useCallback, useEffect } from 'react';

const FormControlLabel = styled(MuiFormControlLabel)({
   '& .MuiSvgIcon-root': { color: Colors.Primary, marginLeft: 2 },
   '& .MuiCheckbox-root .MuiSvgIcon-root': { fontSize: 22, marginLeft: 2 },
});

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

export const assetsCheckbox = (name: string, optionsList: string[][]) =>
   checkBoxHeader.map(({ label }, index) => (
      <CheckboxHeader key={label} name={name} label={label} options={optionsList[index]} />
   ));

const checkBoxHeader = [{ label: 'Current Assets [ASTCAS]' }, { label: 'Non Current Asets' }];
