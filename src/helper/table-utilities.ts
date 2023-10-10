/**
 * Removed unselected row from a table before an operation is performed
 *
 * @param rows Table rows
 */
export const hideUnselectedRows = (rows: NodeListOf<HTMLTableRowElement>) => {
   rows?.forEach((row, index) => {
      if (index) {
         const checkbox = row.querySelector('mat-checkbox') as HTMLInputElement;
         if (checkbox.getAttribute('ng-reflect-checked') === 'false') {
            hideElement(row);
         }
      }
   });
};

/**
 * Hide an element
 *
 * @param element HTML Element
 */
export const hideElement = (element: HTMLElement) => {
   element.style.display = 'none';
   // This is set to indicate the display was set at this point && not
   // already set from a css styling or due to other operations.
   element.dataset.displaySetFrom = 'quick-operation';
};

/**
 * Check if table has selected row
 *
 * @param rows Table rows
 */
export const tableHasSelectedRows = (rows: NodeListOf<HTMLTableRowElement>) => {
   return Array.from(rows || []).some((row) => {
      const checkbox = row.querySelector('mat-checkbox') as HTMLInputElement;
      return checkbox && checkbox.getAttribute('ng-reflect-checked') === 'true';
   });
};

/**
 * Show all elements, that were hidden due to some operations
 *
 * @param elements Dom Element
 */
export const showAllHiddenElements = (elements: NodeListOf<HTMLElement>) => {
   elements?.forEach((element) => {
      if (element.dataset.displaySetFrom === 'quick-operation') {
         element.dataset.displaySetFrom = undefined;
         element.style.display = element.nodeName === 'TR' ? 'table-row' : 'initial';
      }
   });
};

export const parseToCSVString = (headerContents: Array<unknown>, bodyContents: unknown[][]) =>
   `${headerContents
      .map((content) => (typeof content === 'string' && content.includes(',') ? `"${content}"` : content))
      .join(',')}\n${bodyContents
      .map((rowContents) =>
         rowContents
            .map((content) =>
               typeof content === 'string' && content.includes(',') ? `"${content}"` : content
            )
            .join(',')
      )
      .join('\n')}`;
