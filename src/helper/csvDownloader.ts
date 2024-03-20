import {
   ExportConfiguration,
   HeaderRowType,
   retrieveTableData,
   retrieveTableDataByID,
} from './retrieveTableData';
import { parseToCSVString } from './table-utilities';

interface WindowWithFilePicker extends Window {
   showSaveFilePicker?: (options: any) => Promise<any>;
}

const windowWithFilePicker = window as WindowWithFilePicker;

export const downloadAsCSV = (
   headerRow: Array<HeaderRowType>,
   body: Array<Record<string, unknown>>,
   config?: ExportConfiguration,
   title?: string
) => {
   const { headerContents, bodyContents } = retrieveTableData(headerRow, body, config);

   makeCSV(parseToCSVString(headerContents, bodyContents), title);
};

export const downloadAsCSVByID = async (id: string, title?: string) => {
   const { headerContents, bodyContents } = retrieveTableDataByID(id);
   const csvContent = parseToCSVString(headerContents, bodyContents);

   const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });

   try {
      if (windowWithFilePicker.showSaveFilePicker) {
         const fileHandle = await windowWithFilePicker.showSaveFilePicker({
            suggestedName: `${title}.csv`,
            types: [
               {
                  description: 'CSV Files',
                  accept: { 'text/csv': ['.csv'] },
               },
            ],
         });

         const writable = await fileHandle.createWritable();
         await writable.write(csvContent);
         await writable.close();
      } else {
         const link = document.createElement('a');
         link.href = URL.createObjectURL(blob);
         link.download = `${title}.csv`;
         link.style.display = 'none';
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
      }
   } catch (error: any) {
      if (error.name !== 'AbortError') {
         console.error('Error saving file:', error);
      }
   }
};

/**
 * Generate a CSV file
 *
 * @param {string} csvContent - Generated formated csv string
 * @param {string=} title - document name
 */
export function makeCSV(csvContent: string, title: string = 'export_table_') {
   const link = document.createElement('a');
   link.setAttribute('href', `data:text/csv;charset=utf-8,\uFEFF${encodeURI(csvContent)}`);
   link.setAttribute('download', `${title}.csv`);
   link.click();
}
