import { render } from '@testing-library/react';
import { GeneralAppSetup } from '@app/tests/setup';
import AlertDialog from '@app/components/modal/AlertDialog';

describe('<Alert Dialog />', () => {
   const handleClose = jest.fn();
   const handleConfirm = jest.fn();

   const title = 'Dialog Title';
   const subtitle = 'Dialog Subtitle';
   const open = true;

   it('should render collateralselected bodyprop', () => {
      const { getByText } = render(
         <GeneralAppSetup>
            <AlertDialog
               open={open}
               handleClose={handleClose}
               handleConfirm={handleConfirm}
               title={title}
               subtitle={subtitle}
            />
         </GeneralAppSetup>
      );

      const collateralTitle = getByText('Dialog Title');
      expect(collateralTitle).toBeInTheDocument();
      const collateralTitle1 = getByText('Dialog Subtitle');
      expect(collateralTitle1).toBeInTheDocument();
   });
   it('should allow users confirm request', () => {
      const { getByText } = render(
         <GeneralAppSetup>
            <AlertDialog
               open={open}
               handleClose={handleClose}
               handleConfirm={handleConfirm}
               title={title}
               subtitle={subtitle}
            />
         </GeneralAppSetup>
      );

      const collateralTitle = getByText('Confirm');
      expect(collateralTitle).toBeInTheDocument();
   });

   it('should allow users cancel request', () => {
      const { getByText } = render(
         <GeneralAppSetup>
            <AlertDialog
               open={open}
               handleClose={handleClose}
               handleConfirm={handleConfirm}
               title={title}
               subtitle={subtitle}
            />
         </GeneralAppSetup>
      );

      const collateralTitle = getByText('Cancel');
      expect(collateralTitle).toBeInTheDocument();
   });
});
