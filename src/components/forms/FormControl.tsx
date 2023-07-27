import React from 'react';
import {
   InputProps,
   Input,
   SelectInput,
   SelectProps,
   SwitchProps,
   Switch,
   RadioGroupProps,
   RadioGroup,
   CheckBoxGroup,
   CheckBoxGroupProps,
} from '../atoms';

type ControlType = 'input' | 'select' | 'switch' | 'checkboxGroup' | 'radio';

export type FormControlBaseProp<Control extends ControlType = ControlType> = (Control extends 'switch'
   ? SwitchProps
   : Control extends 'select'
   ? SelectProps
   : Control extends 'radio'
   ? RadioGroupProps
   : Control extends 'checkboxGroup'
   ? CheckBoxGroupProps
   : InputProps) & { control: Control; children?: React.ReactNode };

export const FormControlBase: React.FC<FormControlBaseProp> = ({ control, children, ...props }) => {
   switch (control) {
      case 'select':
         return <SelectInput children={children} {...(props as SelectProps)} />;
      case 'switch':
         return <Switch {...(props as SwitchProps)} />;
      case 'radio':
         return <RadioGroup {...(props as RadioGroupProps)} />;
      case 'checkboxGroup':
         return <CheckBoxGroup {...(props as CheckBoxGroupProps)} />;
      default:
         return <Input {...(props as InputProps)} />;
   }
};
