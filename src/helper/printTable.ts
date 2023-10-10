import { hideUnselectedRows, tableHasSelectedRows } from './table-utilities';

/**
 * Print an content of element, using browser print functionality.
 *
 * @param elementId Element ID
 * @param contentTitle Title of the element to be printed
 * @param useProjectStyle Set if project is to style existing on the project or use table predefined style
 * @returns
 */
export function printElementContent(elementId: string, contentTitle: string = '', useProjectStyle = false) {
   const element = document.getElementById(elementId);
   if (!element) return;

   // Clone the element, so manipulation of the element won't affect the actual dom element.
   const clonedElement = document.importNode(element, true);
   const tableRows = clonedElement.querySelectorAll('tr');

   // check if checkbox is present and some are checked, to indicates fields that are
   // only to be printed
   const hasSelectedRows = tableHasSelectedRows(tableRows);

   if (hasSelectedRows && tableRows) {
      hideUnselectedRows(tableRows);
   }

   let projectStyle = '';
   if (useProjectStyle) {
      const styles = document.querySelectorAll('style');
      styles.forEach((style) => {
         projectStyle = `${projectStyle} ${style.innerText}`;
      });
   }
   printInNewWindow(clonedElement, projectStyle, contentTitle);
}

// open a new window and execute document print command on the given element.
const printInNewWindow = (element: HTMLElement, style: string, contentTitle: string = '') => {
   const iframe = document.createElement('iframe');
   iframe.style.position = 'absolute';
   iframe.style.width = '0';
   iframe.style.height = '0';
   iframe.style.border = '0';

   document.body.appendChild(iframe);

   iframe.contentDocument?.open();
   iframe.contentDocument?.write('<head><title>Print</title></head><body>');
   iframe.contentDocument?.write('<style>' + (style || tableStyle) + '</style>');
   iframe.contentDocument?.write('<style> * { overflow: visible !important; } </style>');
   iframe.contentDocument?.write('<h2>' + contentTitle + '</h2>');

   iframe.contentDocument?.body.appendChild(element);
   iframe.contentDocument?.close();

   iframe.contentWindow?.focus();
   iframe.contentWindow?.print();

   setTimeout(() => {
      document.body.removeChild(iframe);
   }, 100);
};

const tableStyle = `
h2{
    margin: 20px 0;
}
table {
    width:90%;
    margin-right:20px;
}
.mat-cell,
.mat-header-cell {
    display: table-cell;
    padding: 15px 10px !important;
    padding-left: 20px !important;
    vertical-align: middle;
}
.hide {
    display: none;
}
.mat-row,
.mat-header-row {
    display: table-row;
}
mat-icon{ display: none !important }

.mat-sort-header-content {
    text-align: left !important;
}
body {
    width:100%;
    padding: 20px;
}
.mat-column-checkbox {
    display: none;
}
.mat-column-more {
    display: none;
}
table {
    border-collapse: collapse;
}
tr.mat-cell {
    border-bottom: 1px solid rgba(0, 0, 0, 0.164);
}
th {
    background: #CF2A2A;
    color: white;
    font-weight: 800;
    font-size: 1.04em;
    padding-top: 20px !important;
    padding-bottom: 20px !important;
}
th, td {
    border: 1px solid rgba(0, 0, 0, 0.103);
}
`;
