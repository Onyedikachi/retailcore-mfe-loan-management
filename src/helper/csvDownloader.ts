import {
   ExportConfiguration,
   HeaderRowType,
   retrieveTableData,
   retrieveTableDataByID,
} from './retrieveTableData';
import { parseToCSVString } from './table-utilities';

export const downloadAsCSV = (
   headerRow: Array<HeaderRowType>,
   body: Array<Record<string, unknown>>,
   config?: ExportConfiguration,
   title?: string
) => {
   const { headerContents, bodyContents } = retrieveTableData(headerRow, body, config);

   makeCSV(parseToCSVString(headerContents, bodyContents), title);
};

export const downloadAsCSVByID = (id: string, title?: string) => {
   const { headerContents, bodyContents } = retrieveTableDataByID(id);

   makeCSV(parseToCSVString(headerContents, bodyContents), title);
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
