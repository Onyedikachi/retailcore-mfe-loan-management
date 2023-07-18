import { fireEvent, render } from '@testing-library/react';
import Accordion from './Accordion';

describe('Component <Accordion />', () => {
   it('should render correctly & hide all content by default', () => {
      const labels = ['Accordion Label 1', 'Accordion Label 2'];
      const { container } = render(
         <Accordion accordionLabels={labels}>
            <AccordionContent index={1} />
            <AccordionContent index={2} />
         </Accordion>
      );

      const accordionSummary = container.querySelectorAll('.MuiAccordionSummary-root');
      expect(accordionSummary.length).toBe(2);
      expect(accordionSummary.item(0).classList.contains('Mui-expanded')).toBe(false);
      expect(accordionSummary.item(1).classList.contains('Mui-expanded')).toBe(false);

      const accordionDetails = container.querySelectorAll('.MuiAccordionDetails-root');
      expect(accordionDetails.item(0)).toHaveTextContent('Accordion Content 1');
      expect(accordionDetails.item(1)).toHaveTextContent('Accordion Content 2');
   });
   it('should only open one accordion child at a time', () => {
      const labels = ['Accordion Label 1', 'Accordion Label 2'];
      const { container } = render(
         <Accordion accordionLabels={labels}>
            <AccordionContent index={1} />
            <AccordionContent index={2} />
         </Accordion>
      );
      
      let accordionSummary = container.querySelectorAll('.MuiAccordionSummary-root');
      fireEvent.click(accordionSummary.item(0));
      accordionSummary = container.querySelectorAll('.MuiAccordionSummary-root');
      expect(accordionSummary.item(0).classList.contains('Mui-expanded')).toBe(true);
      expect(accordionSummary.item(1).classList.contains('Mui-expanded')).toBe(false);


      fireEvent.click(accordionSummary.item(1));
      accordionSummary = container.querySelectorAll('.MuiAccordionSummary-root');
      expect(accordionSummary.item(0).classList.contains('Mui-expanded')).toBe(false);
      expect(accordionSummary.item(1).classList.contains('Mui-expanded')).toBe(true);

   });
});

const AccordionContent = ({ index = 0 }: { index: number }) => {
   return <div>Accordion Content {index}</div>;
};
