import { Colors } from '@app/constants/colors';

export const SelectTheme = {
   styleOverrides: {
      standard: {
         '&::placeholder': { color: Colors.LightGray4 },
         '&:focus': { borderBottomColor: 'red', background: 'transparent' },
      },
      icon: { fontSize: '30px' },
   },
};
