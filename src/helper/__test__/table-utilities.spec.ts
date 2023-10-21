import { hideElement } from '../table-utilities';

describe('Table Utilities', () => {
   let tableHTML;
   const elementId = 'table';

   beforeAll(() => {
      tableHTML = `
        <table id="${elementId}">
          <tr>
            <td>Row 1</td>
            <td>Row 1</td>
          </tr>
          <tr>
            <td>Row 2</td>
            <td>Row 2</td>
          </tr>
        </table>
      `;
      document.body.innerHTML = tableHTML;
   });

   afterEach(() => {
      document.body.innerHTML = '';
   });

   describe('hideElement', () => {
      it('should hide an HTML element', () => {
         const element = document.querySelector('td');
         hideElement(element!);
         expect(element!.style.display).toBe('none');
      });
   });
});
