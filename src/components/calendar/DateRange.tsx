import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useEffect, useState } from 'react';
import { addYears, endOfDay, parse, startOfYear } from 'date-fns';
import { Colors } from '@app/constants/colors';
import { createPortal } from 'react-dom';
import { Button } from '../atoms/Button';
import { Box } from '@mui/material';
import { StyledDateRange } from './StyledDateRange';
import { customStaticRanges } from './calendar-data';
import { DateRangePickerProps } from 'react-date-range';
import { CustomeDateRangeForm } from './CustomDateRangeForm';

export interface DateRangeProps extends DateRangePickerProps {
   onClickReset?: () => void;
   onStaticRangeSelected?: (label: string, date: { startDate: Date; endDate: Date }) => void;
   onDateRangeChange?: (startDate?: Date, endDate?: Date) => void;
}

export const DateRange: React.FC<DateRangeProps> = ({
   onClickReset,
   onStaticRangeSelected,
   onDateRangeChange,
   ...prop
}) => {
   const defaultDate = { startDate: new Date(), endDate: new Date(), key: 'selection' };
   const [state, setState] = useState({ selection: defaultDate });
   const [staticRangeLabel, setStaticRangeLabel] = useState<string>('');
   const [customSelected, setCustomSelected] = useState<boolean>(false);
   const [buttonWrapperNode, setButtonWrapperNode] = useState<HTMLDivElement>();

   useEffect(() => {
      const weekDays = document.querySelectorAll('.rdrWeekDay');
      weekDays.forEach((day) => {
         day.textContent = day.textContent?.charAt(0) ?? '';
      });

      const prevButton = document.querySelector('.rdrPprevButton');
      const nextButton = document.querySelector('.rdrNextButton');
      if (prevButton) {
         prevButton.innerHTML = '&#8592;';
      }
      if (nextButton) {
         nextButton.innerHTML = '&#8594;';
      }
   }, []);

   useEffect(() => {
      const parentElement = document.querySelector('.rdrCalendarWrapper');
      const divElement = document.createElement('div');

      if (parentElement) {
         parentElement.appendChild(divElement);
      }
      setButtonWrapperNode(divElement);
   }, [customSelected]);

   const handleStaticDateRange = (label: string, date: { startDate: Date; endDate: Date }) => {
      if (label !== staticRangeLabel) setStaticRangeLabel(label);
      setCustomSelected(false);
      onStaticRangeSelected?.(label, date);
      if (label == 'All Time') {
         onDateRangeChange?.(undefined, undefined);
      }
   };

   return (
      <>
         {staticRangeLabel != 'Custom' || (staticRangeLabel == 'Custom' && customSelected) ? (
            <>
               <StyledDateRange
                  rangeColors={[Colors.Pink, '#F9E5E5']}
                  showMonthAndYearPickers={false}
                  onChange={(item) => {
                     setState({ ...state, ...item });
                     onDateRangeChange?.(item.selection.startDate, item.selection.endDate);
                  }}
                  months={1}
                  minDate={startOfYear(new Date(1990, 0, 1))}
                  maxDate={endOfDay(addYears(new Date(), 10))}
                  direction="vertical"
                  scroll={{ enabled: false }}
                  ranges={[state.selection]}
                  staticRanges={customStaticRanges(handleStaticDateRange)}
                  {...prop}
               />
               {buttonWrapperNode &&
                  createPortal(
                     <Box textAlign="end" p={2} pt={0}>
                        <Button
                           onClick={() => {
                              setState({ selection: defaultDate });
                              onDateRangeChange?.(undefined, undefined);
                              onClickReset?.();
                           }}
                        >
                           Reset
                        </Button>
                     </Box>,
                     buttonWrapperNode
                  )}
            </>
         ) : (
            <CustomeDateRangeForm
               onSubmit={(values) => {
                  const startDate = parse(values.startDate, 'dd/MM/yyyy', new Date());
                  const endDate = parse(values.endDate, 'dd/MM/yyyy', new Date());
                  onDateRangeChange?.(startDate, endDate);
                  setState({ selection: { ...state.selection, startDate: startDate, endDate: endDate } });
                  setCustomSelected(true);
                  setStaticRangeLabel('');
               }}
            />
         )}
      </>
   );
};
