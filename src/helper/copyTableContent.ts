import {
   hideElement,
   hideUnselectedRows,
   showAllHiddenElements,
   tableHasSelectedRows,
} from './table-utilities';

export const copyTableContent = (elementId: string) => {
   const element = document.getElementById(elementId);
   if (!element) return;

   const matIcons = element.querySelectorAll('mat-icon') as NodeListOf<HTMLElement>;
   matIcons.forEach((icon) => hideElement(icon));

   const tableRows = element.querySelectorAll('tr');
   const hasSelectedRows = tableHasSelectedRows(tableRows);

   if (hasSelectedRows) {
      hideUnselectedRows(tableRows);
   }

   if (document.createRange && document.getSelection) {
      const range = document.createRange();
      const selection = document.getSelection();
      selection?.removeAllRanges();
      try {
         element && range.selectNodeContents(element);
         selection?.addRange(range);
      } catch (e) {
         element && range.selectNode(element);
         selection?.addRange(range);
      }
      document.execCommand('copy');
      selection?.removeAllRanges();
   } else {
      const body = document.body;
      const range = (body as any)?.createTextRange?.();
      range.moveToElementText(element);
      range.select();
      document.execCommand('copy');
   }

   showAllHiddenElements(tableRows);
   showAllHiddenElements(matIcons);
};
