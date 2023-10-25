import React from 'react';
import { render } from '@testing-library/react';
import { ActivityLog, dateFormater } from '../ActivityLog';

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
         { pending: false, subtitle: 'Verify and Submit request for processing', title: 'Pending Actitvity' },
      ];

      const { getByText } = render(<ActivityLog logs={logs} title="Custom Title" />);

      logs.forEach((log) => {
         expect(getByText(log.title)).toBeInTheDocument();
         expect(getByText(log.subtitle)).toBeInTheDocument();
      });
   });
   describe('dateFormater Function', () => {
      it('formats a valid timestamp correctly', () => {
         const timestamp = '2023-10-19T10:30:00Z';
         const formattedDate = dateFormater(timestamp);
         expect(/Oct \d{2}, 2023 \[\d{2}:\d{2} [APap][Mm]\]/.test(formattedDate)).toBe(true);
      });

      it('returns "awaiting response" for the special timestamp', () => {
         const timestamp = 'awaiting response';
         const formattedDate = dateFormater(timestamp);
         expect(formattedDate).toBe('awaiting response');
      });
   });
});
