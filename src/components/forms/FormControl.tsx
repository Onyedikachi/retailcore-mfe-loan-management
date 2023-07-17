import React from 'react';
import { InputProps, Input, SelectInput, SelectProps } from '../atoms';

type ExtendedInputProps = InputProps & {
   control: 'input';
   children?: React.ReactNode;
};
type ExtendedSelectProps = SelectProps & {
   control: 'select';
   children?: React.ReactNode;
};

type FormControlBaseProp = ExtendedInputProps | ExtendedSelectProps;

export const FormControlBase: React.FC<FormControlBaseProp> = ({ control = 'input', children, ...props }) => {
   switch (control) {
      case 'select':
         return <SelectInput children={children} {...(props as SelectProps)} />;
      default:
         return <Input {...(props as InputProps)} />;
   }
};
