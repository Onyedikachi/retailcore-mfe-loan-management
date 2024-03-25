interface WindowWithFilePicker extends Window {
   showSaveFilePicker?: (options: any) => Promise<any>;
}
const windowWithFilePicker = window as WindowWithFilePicker;

import {
   ExportConfiguration,
   HeaderRowType,
   retrieveTableData,
   retrieveTableDataByID,
} from './retrieveTableData';
import { parseToCSVString } from './table-utilities';

export const downloadAsCSV = async (
   headerRow: Array<HeaderRowType>,
   body: Array<Record<string, unknown>>,
   config?: ExportConfiguration,
   title?: string
) => {
   const { headerContents, bodyContents } = retrieveTableData(headerRow, body, config);

   const csvContent = parseToCSVString(headerContents, bodyContents);

   // Create a Blob from the CSV content
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
         // Create a data URL from the Blob content
         const reader = new FileReader();
         reader.onload = function (event) {
            if (event?.target) {
               // Null check for event.target

               const dataURL = event.target.result as string;
               const link = document.createElement('a');
               link.href = dataURL;
               link.download = `${title}.csv`;
               link.style.display = 'none';
               document.body.appendChild(link);
               link.click();
               document.body.removeChild(link);
            }
         };
         reader.readAsDataURL(blob);
      }
   } catch (error: any) {
      if (error.name !== 'AbortError') {
         console.error('Error saving file:', error);
      }
   }
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
         // Create a data URL from the Blob content
         const reader = new FileReader();
         reader.onload = function (event) {
            if (event?.target) {
               // Null check for event.target

               const dataURL = event.target.result as string;
               const link = document.createElement('a');
               link.href = dataURL;
               link.download = `${title}.csv`;
               link.style.display = 'none';
               document.body.appendChild(link);
               link.click();
               document.body.removeChild(link);
            }
         };
         reader.readAsDataURL(blob);
      }
   } catch (error: any) {
      if (error.name !== 'AbortError') {
         console.error('Error saving file:', error);
      }
   }
};
