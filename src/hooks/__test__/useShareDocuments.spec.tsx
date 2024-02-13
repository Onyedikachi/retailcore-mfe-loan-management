import useShareDocument from '../useShareDocuments';

// Mock external dependencies
jest.mock('html2canvas', () => ({
   __esModule: true,
   default: async (element: any) => {
      // Mock the behavior of html2canvas
      // const canvas = document.createElement('canvas')
      // canvas.toBlob = (callback, mimeType) => {
      //   if (mimeType === 'image/png') {
      //     // Simulate blob creation
      //     const blob = new Blob([new Uint8Array([8, 6, 7, 5, 3, 0, 9])], { type: 'image/png' })
      //     callback(blob)
      //   }
      // }
      // return canvas
   },
}));

// Mock the navigator.share function
global.navigator.share = jest.fn();

describe('useShareDocument', () => {
   it('should share the document when the navigator.share API is available', async () => {
      const shareableAreaRef = { current: document.createElement('div') };

      const { handleShare } = useShareDocument('document', shareableAreaRef);

      const alertMock = jest.spyOn(global, 'alert').mockImplementation(() => {});

      await handleShare();

      expect(global.navigator.share).toHaveBeenCalledTimes(0);
      expect(alertMock).not.toHaveBeenCalled(); // No alert should be displayed
   });

   it('should display an error message when the navigator.share API is not available', async () => {
      const shareableAreaRef = { current: document.createElement('div') };

      global.navigator.share = undefined as any;

      const { handleShare } = useShareDocument('document', shareableAreaRef);

      const alertMock = jest.spyOn(global, 'alert').mockImplementation(() => {});

      await handleShare();

      expect(alertMock).toHaveBeenCalledTimes(0);
   });

   it('should display an error message when the navigator.share API is not available', async () => {
      const shareableAreaRef = { current: document.createElement('div') };

      global.navigator.share = undefined as any;

      const { handleShare } = useShareDocument(
         'document',
         shareableAreaRef,
         document.getElementById('div') as HTMLElement
      );

      const alertMock = jest.spyOn(global, 'alert').mockImplementation(() => {});

      await handleShare();

      expect(alertMock).toHaveBeenCalledTimes(0);
   });
});
