/* eslint-disable no-console */
import html2canvas from 'html2canvas';

export const useShareDocument = (fileName: string, shareableAreaRef: any, htmlElement?: HTMLElement) => {
   const shareCallback = (blob: any) => {
      try {
         if (blob) {
            navigator.share({
               title: 'Share document',
               files: [new File([blob], `${fileName}.png`, { type: 'image/png' })],
            });
         }
      } catch (err) {
         console.log(err, 'err');
      }
   };

   const handleShare = async () => {
      try {
         //  if (navigator.share) {
         const canvas = await html2canvas(shareableAreaRef?.current || htmlElement);

         // Convert canvas to a blob
         canvas.toBlob(shareCallback, 'image/png');
         //  } else {
         //     console.log('Web Share API is not supported in this browser.');
         //  }
      } catch (error) {
         console.log(error, 'err');
      }
   };

   return { handleShare };
};

export default useShareDocument;
