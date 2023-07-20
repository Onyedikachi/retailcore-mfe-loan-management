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

type ExtendedInputProps = InputProps & {
   control: 'input';
   children?: React.ReactNode;
};
type ExtendedSelectProps = SelectProps & {
   control: 'select';
   children?: React.ReactNode;
};
type ExtendedSwitchProps = SwitchProps & {
   control: 'switch';
   children?: React.ReactNode;
};
type ExtendedRadioProps = RadioGroupProps & {
   control: 'radio';
   children?: React.ReactNode;
};
type ExtendedCheckboxProps = CheckBoxGroupProps & {
   control: 'checkboxGroup';
   children?: React.ReactNode;
};

type FormControlBaseProp =
   | ExtendedInputProps
   | ExtendedSelectProps
   | ExtendedSwitchProps
   | ExtendedRadioProps
   | ExtendedCheckboxProps;

export const FormControlBase: React.FC<FormControlBaseProp> = ({ control = 'input', children, ...props }) => {
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
