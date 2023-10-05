import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../atoms/Button';
import { Box } from '@mui/material';
import { StyledCalendar } from './StyledCalendar';
import { Colors } from '@app/constants/colors';
import { addYears, endOfDay, startOfYear } from 'date-fns';
import { CalendarProps } from 'react-date-range';

export interface CalenderProp extends CalendarProps {
   onClickClear?: () => void;
   onDateChange?: (date: Date | undefined) => void;
}

export const Calendar: React.FC<CalenderProp> = ({ onClickClear, onDateChange, ...prop }) => {
   const [date, setDate] = useState<Date | undefined>(undefined);
   const [buttonWrapperNode, setButtonWrapperNode] = useState<HTMLDivElement>();

   useEffect(() => {
      const weekDays = document.querySelectorAll('.rdrWeekDay');
      weekDays.forEach((day) => {
         const fullDayName = day.textContent;
         const firstLetter = fullDayName?.charAt(0);
         day.textContent = firstLetter!;
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
   }, []);

   return (
      <>
         <StyledCalendar
            rangeColors={[Colors.Pink, '#F9E5E5']}
            onChange={(item) => {
               setDate(item);
               onDateChange?.(item);
            }}
            minDate={startOfYear(new Date(1990, 0, 1))}
            maxDate={endOfDay(addYears(new Date(), 10))}
            date={date}
            {...prop}
         />
         {buttonWrapperNode &&
            createPortal(
               <Box display="flex" justifyContent="space-between" p={1} pt={0}>
                  <Button
                     variant="text"
                     sx={{ px: 1 }}
                     onClick={() => {
                        setDate(undefined);
                        onDateChange?.(undefined);
                        onClickClear?.();
                     }}
                  >
                     Clear
                  </Button>
                  <Button
                     variant="text"
                     sx={{ px: 1 }}
                     onClick={() => {
                        setDate(new Date());
                        onDateChange?.(new Date());
                     }}
                  >
                     Today
                  </Button>
               </Box>,
               buttonWrapperNode
            )}
      </>
   );
};
