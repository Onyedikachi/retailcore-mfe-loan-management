import { render } from '@testing-library/react';
import { GeneralAppSetup } from '@app/tests/setup';
import { ResponseDialog } from '@app/components/modal/ResponseDialog';

describe('<Response Dialog />', () => {
   const handleClose = jest.fn();
   const handlePrevious = jest.fn();
   const handleNext = jest.fn();
   const title = 'Success Title';
   const subtitle = 'Success Subtitle';
   const open = true;
   const status = 'success';
   const previousText = 'Previous';
   const nextText = 'Next';
   it('should render Response Dialog bodyprop', () => {
      const { getByText, getByRole } = render(
         <GeneralAppSetup>
            <ResponseDialog
               title={title}
               subtitle={subtitle}
               open={open}
               status={status}
               handleClose={handleClose}
               handlePrevious={handlePrevious}
               handleNext={handleNext}
               previousText={previousText}
               nextText={nextText}
            />
         </GeneralAppSetup>
      );

      const responseDialog = getByText('Success Title');
      expect(responseDialog).toBeInTheDocument();
      const successTitle = getByText(title);
      expect(successTitle).toBeInTheDocument();

      const successSubtitle = getByText(subtitle);
      expect(successSubtitle).toBeInTheDocument();

      const previousButton = getByRole('button', { name: previousText });
      expect(previousButton).toBeInTheDocument();

      const nextButton = getByRole('button', { name: nextText });
      expect(nextButton).toBeInTheDocument();
   });
});
