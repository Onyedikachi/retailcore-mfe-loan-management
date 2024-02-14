import { CheckBoxTheme } from '../mui-checkbox';

describe('CheckBoxTheme', () => {
   test('contains styleOverrides for root element', () => {
      expect(CheckBoxTheme.styleOverrides).toHaveProperty('root');
      expect(CheckBoxTheme.styleOverrides.root).toHaveProperty('padding', '9px 4px');
   });
});
