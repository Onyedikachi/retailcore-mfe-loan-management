import { render, screen } from '@testing-library/react';
import { printElementContent } from '../printTable';

// describe('printElementContent', () => {
//   test('should print element content with selected rows', () => {
//     // Mocking required functions from table-utilities
//     const getMock = jest.mock('../table-utilities', () => ({
//       hideUnselectedRows: jest.fn(),
//       tableHasSelectedRows: jest.fn(() => true),
//     }));

//     // Mocking window print function
//     window.print = jest.fn();

//     // Create an element with some content
//     document.body.innerHTML = `
//       <div id="testElement">
//         <table>
//           <tr>
//             <td>Row 1</td>
//           </tr>
//           <tr>
//             <td>Row 2</td>
//           </tr>
//         </table>
//       </div>
//     `;

    // Call the function
    //printElementContent('testElement', 'Test Content', true);

    // Expect the required functions to be called
   // expect(screen.getByTestId('Test Content')).toBeInTheDocument();
    
   //expect(window.print).not.toHaveBeenCalled();
    //expect(getMock).toBeCalled();

    // You may want to assert further based on the actual implementation
//   });

  test('should handle missing element', () => {
    // Mocking window print function
    window.print = jest.fn();

    // Call the function with a non-existent element
    printElementContent('nonExistentElement');

    // Expect the window.print not to have been called
    expect(window.print).not.toHaveBeenCalled();
  });
//});
