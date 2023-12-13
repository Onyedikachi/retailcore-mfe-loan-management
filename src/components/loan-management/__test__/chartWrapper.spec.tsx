import { render } from '@testing-library/react';
import { GeneralAppSetup } from '@app/tests/setup';
import { ChartWrapper } from '../ChartWrapper';


describe('<ChartWrapper Component/>', () => {
    const dataDetails = {
        labels: ['Label 1', 'Label 2'],
        footerlabels: ['Footer Label 1', 'Footer Label 2'],
        data: [10, 20],
        labelAmount: ['Amount 1', 'Amount 2'],
        backgroundColors: ['#FF0000', '#00FF00'],
     };
  
     const mockChildren = <div data-testid="mock-children">Mock Children</div>;
     const mockTitle = 'Mock Title';
     const mockTotal = '1234';

   it('should render TableHeading Component bodyprop', () => {
      const {getByTestId,getByText} = render(
         <GeneralAppSetup>
           <ChartWrapper title={mockTitle} total={mockTotal} dataDetails={dataDetails}>
            {mockChildren}
         </ChartWrapper>

         </GeneralAppSetup>
      );

      const titleElement = getByText(mockTitle);
      expect(titleElement).toBeInTheDocument();

      const totalElement = getByText(mockTotal);
      expect(totalElement).toBeInTheDocument();

      const footerlabel1 = getByText('Footer Label 1');
      expect(footerlabel1).toBeInTheDocument();

      const footerlabel2 = getByText('Footer Label 2');
      expect(footerlabel2).toBeInTheDocument();

      const currency = getByText('NGN');
      expect(currency).toBeInTheDocument();

      const childrenElement = getByTestId('mock-children');
      expect(childrenElement).toBeInTheDocument();
    
   });

});