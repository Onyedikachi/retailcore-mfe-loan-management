import { Range } from 'react-date-range';
import { addDays, endOfDay, startOfMonth, endOfMonth, addMonths, isSameDay } from 'date-fns';

export const customStaticRanges = (
   onStaticRangeSelected?: (label: string, date: { startDate: Date; endDate: Date }) => void
) => [
   {
      label: 'All Time',
      date: { startDate: new Date(), endDate: new Date(new Date().setFullYear(1925)) },
      range() {
         return this.date;
      },
      isSelected(range: Range) {
         isSelectedRange(this.date, range) && onStaticRangeSelected?.(this.label, this.date);
         return isSelectedRange(this.date, range);
      },
   },
   {
      label: 'Last 7 days',
      date: { startDate: addDays(new Date(), -7), endDate: endOfDay(new Date()) },
      range() {
         return this.date;
      },
      isSelected(range: Range) {
         isSelectedRange(this.date, range) && onStaticRangeSelected?.(this.label, this.date);
         return isSelectedRange(this.date, range);
      },
   },
   {
      label: 'Last 14 days',
      date: { startDate: addDays(new Date(), -14), endDate: endOfDay(new Date()) },
      range() {
         return this.date;
      },
      isSelected(range: Range) {
         isSelectedRange(this.date, range) && onStaticRangeSelected?.(this.label, this.date);
         return isSelectedRange(this.date, range);
      },
   },
   {
      label: 'Last 30 days',
      date: { startDate: addDays(new Date(), -30), endDate: endOfDay(new Date()) },
      range() {
         return this.date;
      },
      isSelected(range: Range) {
         isSelectedRange(this.date, range) && onStaticRangeSelected?.(this.label, this.date);
         return isSelectedRange(this.date, range);
      },
   },
   {
      label: 'Last 3 months',
      date: { startDate: startOfMonth(addMonths(new Date(), -3)), endDate: endOfMonth(new Date()) },
      range() {
         return this.date;
      },
      isSelected(range: Range) {
         isSelectedRange(this.date, range) && onStaticRangeSelected?.(this.label, this.date);
         return isSelectedRange(this.date, range);
      },
   },
   {
      label: 'Last 12 months',
      date: { startDate: startOfMonth(addMonths(new Date(), -12)), endDate: endOfMonth(new Date()) },
      range() {
         return this.date;
      },
      isSelected(range: Range) {
         isSelectedRange(this.date, range) && onStaticRangeSelected?.(this.label, this.date);
         return isSelectedRange(this.date, range);
      },
   },
   {
      label: 'Custom',
      date: { startDate: addDays(new Date(), 50), endDate: new Date() },
      range() {
         return this.date;
      },
      isSelected(range: Range) {
         isSelectedRange(this.date, range) && onStaticRangeSelected?.(this.label, this.date);
         return isSelectedRange(this.date, range);
      },
   },
];

const isSelectedRange = (range: Range, selectedRange: Range): boolean => {
   return (
      isSameDay(range.startDate as Date, selectedRange.startDate as Date) &&
      isSameDay(range.endDate as Date, selectedRange.endDate as Date)
   );
};
