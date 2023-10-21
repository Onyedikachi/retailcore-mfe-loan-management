import { Colors } from '@app/constants/colors';
import { renderWithThemeProvider } from './test.utils';
import { DocumentFormat } from '../DocumentFormat';

describe('DocumentFormat styles', () => {
   it('should render DocumentFormat with correct styles', () => {
      const { container } = renderWithThemeProvider(<DocumentFormat />);
      const formatElement = container.firstChild;

      expect(formatElement).toHaveStyle(`
      border: 1px solid ${Colors.LightGray};
      padding: 5px;
      margin-right: 5px;
      border-radius: 14px;
      font-size: 12px;
      display: flex;
      align-items: center;
    `);
   });
});
