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
import { Autocomplete, AutocompleteProps } from '../atoms/auto-complete';
import { DateControl, DateControlProps } from './DateControl';

export type ControlType = 'input' | 'select' | 'switch' | 'checkboxGroup' | 'radio' | 'autocomplete' | 'date';

export type FormControlBaseProp<Control extends ControlType = ControlType> = (Control extends 'switch'
   ? SwitchProps
   : Control extends 'select'
   ? SelectProps
   : Control extends 'radio'
   ? RadioGroupProps
   : Control extends 'checkboxGroup'
   ? CheckBoxGroupProps
   : Control extends 'autocomplete'
   ? AutocompleteProps
   : Control extends 'date'
   ? DateControlProps
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
      case 'autocomplete':
         return <Autocomplete {...(props as AutocompleteProps)} />;
      case 'date':
         return <DateControl {...(props as DateControlProps)} />;
      default:
         return <Input {...(props as InputProps)} />;
   }
};
