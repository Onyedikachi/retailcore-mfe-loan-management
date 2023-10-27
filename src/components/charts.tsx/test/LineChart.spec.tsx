import { screen } from '@testing-library/react';
import { LineChart } from '../LineChart';
import { renderWithThemeProvider } from '@app/tests/theme.utils';

describe('LineChart component', () => {
   it('should render a LineChart with provided data', () => {
      const dataDetails = {
         labels: ['Label1', 'Label2', 'Label3'],
         data: [[30, 40, 30]],
         backgroundColors: ['#FF5733', '#33FF57', '#5733FF'],
      };
      renderWithThemeProvider(<LineChart width="300px" height="150px" dataDetails={dataDetails} />);

      const chartCanvas = screen.getByTestId('line-chart');
      expect(chartCanvas).toBeInTheDocument();
   });
});
