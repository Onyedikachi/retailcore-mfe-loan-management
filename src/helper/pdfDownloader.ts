import { jsPDF } from 'jspdf';
import {
   ExportConfiguration,
   HeaderRowType,
   retrieveTableData,
   retrieveTableDataByID,
} from './retrieveTableData';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';

export const downloadTableAsPDF = (
   headerRow: Array<HeaderRowType>,
   body: Array<Record<string, unknown>>,
   title: string,
   config?: ExportConfiguration,
   name?: string
) => {
   const { headerContents, bodyContents } = retrieveTableData(headerRow, body, config);

   createPdf(headerContents, bodyContents, title, name);
};

export const downloadTableAsPDFByID = (id: string, title: string, name?: string) => {
   const { headerContents, bodyContents } = retrieveTableDataByID(id);
   createPdf(headerContents, bodyContents, title, name);
};

type HTMLPDFConfiguration = {
   singlePage?: boolean;
   share?: boolean;
};
export const downloadHTMLAsPDF = async (
   id: string,
   name: string = 'export_table_',
   config?: HTMLPDFConfiguration
) => {
   const element = document.getElementById(id);

   if (element) {
      const elemHeight = element.offsetHeight;
      const elemWidth = element.offsetWidth;

      const canvas = await html2canvas(element, {
         scale: 3,
      });

      const img = canvas.toDataURL('image/jpeg', 1);
      const doc = new jsPDF('l', 'px', config?.singlePage ? [elemWidth, elemHeight] : [612, 792]);

      const pageHeight = doc.internal.pageSize.getHeight();
      const pageWidth = doc.internal.pageSize.getWidth();
      const width = elemWidth < pageWidth ? elemWidth : pageWidth;
      const widthRatio = elemWidth < pageWidth ? 1 : pageWidth / elemWidth;

      doc.addImage(img, 'JPEG', 10, 10, width - 20, widthRatio * elemHeight);

      for (let i = 1; i < Math.ceil(elemHeight / pageHeight); i++) {
         doc.addPage();
         doc.addImage(img, 'JPEG', 10, -(i * pageHeight) + 10, width - 20, widthRatio * elemHeight);
      }

      doc.save(`${name}_${Date.now()}.pdf`);
   }
};

export const blobToDataURL = (blob: Blob) => {
   return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = function (e) {
         resolve(e.target?.result);
      };
      reader.readAsDataURL(blob);
   });
};

const createPdf = (head: Array<unknown>, data: unknown[][], title: string, name?: string) => {
   const doc = new jsPDF();
   doc.setFontSize(19).text(title, 11, 8).setFontSize(11).setTextColor(100);

   (doc as any).autoTable({
      head: [head],
      body: data,
      theme: 'grid',
      headStyles: {
         fillColor: '#CF2A2A',
         textColor: 'ffffff',
      },
      columnStyles: {
         0: {
            minCellWidth: 10,
         },
      },
   });
   doc.save(`${name ?? title}_${Date.now()}.pdf`);
   doc.output('datauri');
};
