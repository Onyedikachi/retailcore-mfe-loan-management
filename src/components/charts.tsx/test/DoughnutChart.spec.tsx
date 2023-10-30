import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { DoughnutChart } from '../DoughnutChart';
import { renderWithThemeProvider } from '@app/tests/theme.utils';

describe('DoughnutChart component', () => {
   it('should render a DoughnutChart with provided data', () => {
      const dataDetails = {
         labels: ['Label1', 'Label2', 'Label3'],
         data: [30, 40, 30],
         backgroundColors: ['#FF5733', '#33FF57', '#5733FF'],
      };

      renderWithThemeProvider(<DoughnutChart dataDetails={dataDetails} width="300px" height="300px" />);
      const chartCanvas = screen.getByTestId('doughnut-chart');
      expect(chartCanvas).toBeInTheDocument();
   });
});
