import { screen, fireEvent } from '@testing-library/react';
import { Calendar } from '../Calendar';
import { renderWithThemeProvider } from '@app/tests/theme.utils';

describe('Calendar component', () => {
   it('should render a Calendar with clear and today buttons', () => {
      const onClickClear = jest.fn();
      const onDateChange = jest.fn();
      const { container } = renderWithThemeProvider(
         <Calendar onClickClear={onClickClear} onDateChange={onDateChange} />
      );
      const calendar = container.querySelector('.rdrCalendarWrapper') as HTMLElement;
      expect(calendar).toBeInTheDocument();

      const clearButton = screen.getByText('Clear');
      expect(clearButton).toBeInTheDocument();

      const todayButton = screen.getByText('Today');
      expect(todayButton).toBeInTheDocument();

      fireEvent.click(clearButton);

      expect(onClickClear).toHaveBeenCalledTimes(1);

      fireEvent.click(todayButton);

      expect(onDateChange).toHaveBeenCalledTimes(2);
   });
});
