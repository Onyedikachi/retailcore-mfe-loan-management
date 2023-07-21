import React from 'react';
import { InputProps, Input, SelectInput, SelectProps, SwitchProps, Switch } from '../atoms';

type ControlType = 'input' | 'select' | 'switch';

export type FormControlBaseProp<Control extends ControlType = ControlType> = (Control extends 'switch'
   ? SwitchProps
   : Control extends 'select'
   ? SelectProps
   : InputProps) & { control: Control; children?: React.ReactNode };

export const FormControlBase: React.FC<FormControlBaseProp> = ({ control, children, ...props }) => {
   switch (control) {
      case 'select':
         return <SelectInput children={children} {...(props as SelectProps)} />;
      case 'switch':
         return <Switch {...(props as SwitchProps)} />;
      default:
         return <Input {...(props as InputProps)} />;
   }
};
