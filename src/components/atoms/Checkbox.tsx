import React, { InputHTMLAttributes } from 'react';
import { Checkbox as MuiCheckbox, CheckboxProps as MuiCheckboxProps, styled } from '@mui/material';

import { CheckBoxTheme } from '../../utils/material-themes/mui-checkbox'

const StyledCheckbox = styled(MuiCheckbox)(CheckBoxTheme.styleOverrides.root);

export interface CheckboxProps extends Omit<MuiCheckboxProps, 'classes'> {
  label?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, ...restProps }) => {
  return (
    <label style={{ display: 'flex', alignItems: 'center' }}>
      <StyledCheckbox {...restProps} />
      {label}
    </label>
  );
};

export default Checkbox;
