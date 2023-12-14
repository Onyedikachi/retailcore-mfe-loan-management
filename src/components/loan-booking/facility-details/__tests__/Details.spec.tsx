import { render } from '@testing-library/react';
import { GeneralAppSetup } from '@app/tests/setup';

import { Details } from '../../process-summary/Details';

describe('<Details Component/>', () => {
   const detailsData = [
      {
         key: 'Key 1',
         value: 'Value 1',
         view: true,
         heading: 'Josh',
      },
      {
         key: 'Key 2',
         value: 'Value 2',
         view: true,
         heading: 'Dolapo',
      },
   ];

   const title = 'Details Title';
   const customerId = 'customer123';

   it('should render Response Dialog bodyprop', () => {
      const { getByText } = render(
         <GeneralAppSetup>
            <Details title={title} details={detailsData} customerId={customerId} />
         </GeneralAppSetup>
      );

      const responseDetailsKey1 = getByText('Key 1');
      expect(responseDetailsKey1).toBeInTheDocument();

      const responseDetailsKey2 = getByText('Key 2');
      expect(responseDetailsKey2).toBeInTheDocument();

      const responseDetailsValue1 = getByText('Value 1');
      expect(responseDetailsValue1).toBeInTheDocument();

      const responseDetailsValue2 = getByText('Value 2');
      expect(responseDetailsValue2).toBeInTheDocument();

      const responseDetailsHeading1 = getByText('Josh');
      expect(responseDetailsHeading1).toBeInTheDocument();

      const responseDetailsHeading2 = getByText('Dolapo');
      expect(responseDetailsHeading2).toBeInTheDocument();
   });
});
