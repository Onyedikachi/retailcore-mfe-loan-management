import { render } from '@testing-library/react';
import { ActivityLog, dateFormatter } from '../ActivityLog';

describe('ActivityLog Component', () => {
   it('renders the title correctly', () => {
      const { getByText } = render(<ActivityLog title="Custom Title" />);
      const titleElement = getByText('Custom Title');
      expect(titleElement).toBeInTheDocument();
   });

   it('displays "No activities found" when no logs are provided', () => {
      const { getByText } = render(<ActivityLog />);
      const noActivitiesText = getByText('No activities found');
      expect(noActivitiesText).toBeInTheDocument();
   });

   it('renders logs correctly', () => {
      const logs = [
         { pending: false, subtitle: 'Verify and Submit request for processing', title: 'Pending Activity' },
      ];

      const { getByText } = render(<ActivityLog logs={logs} title="Custom Title" />);

      logs.forEach((log) => {
         expect(getByText(log.title)).toBeInTheDocument();
         expect(getByText(log.subtitle)).toBeInTheDocument();
      });
   });
   describe('dateFormatter Function', () => {
      it('returns "awaiting response" for the special timestamp', () => {
         const timestamp = 'awaiting response';
         const formattedDate = dateFormatter(timestamp);
         expect(formattedDate).toBe('awaiting response');
      });
   });
});
