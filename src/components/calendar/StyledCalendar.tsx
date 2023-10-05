import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Calendar } from 'react-date-range';
import { Colors } from '@app/constants/colors';
import styled from '@emotion/styled';

export const StyledCalendar = styled(Calendar)(() => {
   return {
      fontFamily: ['Inter'].join(','),
      fontSize: '14px',
      color: ` #636363 !important`,
      '& .rdrStaticRange': {
         borderBottom: 'none !important',
         background: 'none !important',
         '& :hover': { backgroundColor: `none !important` },
      },
      '& .rdrNextPrevButton': {
         background: 'none !important',
         border: '0.1px solid #636363',
         fontSize: '16px',
      },
      '.rdrDefinedRangesWrapper': { borderRight: 'none !important', width: 'unset !important' },
      '.rdrMonthAndYearPickers': {
         fontSize: '16px !important',
         select: {
            padding: '7px 23px 8px 0px !important',
         },
      },
      '& .rdrStaticRangeLabel': {
         color: '#636363 !important',
         fontFamily: ['Inter'].join(','),
         fontSize: '14px',
         fontWeight: '500 !important',
         '& :hover': { backgroundColor: `none !important` },
      },
      '.rdrDateDisplayWrapper, .rdrInputRanges': { display: 'none' },
      '& .rdrWeekDay': { fontSize: '10px' },
      '.rdrDayNumber span': {
         fontSize: '14px',
         fontWeight: '500 !important',
         color: '#636363',
      },
      '.rdrDay': { height: '32px', width: '35px' },
      '.rdrDayToday .rdrDayNumber': {
         ' span:after': {
            background: `${Colors.Primary} !important`,
         },
      },
      '.rdrSelected': {
         backgroundColor: `#F9E5E5 !important`,
         borderRadius: '2px !important',
         '& ~ .rdrDayNumber span': {
            color: `${Colors.Primary} !important`,
         },
      },
      '.rdrDayHovered, .rdrDayStartPreview, .rdrDayEndPreview, .rdrDayEndOfWeek, .rdrDayStartOfWeek': {
         color: `rgba(0, 0, 0, 0.00) !important`,
         border: 'none !important',
      },
      '.rdrMonthAndYearWrapper': { paddingTop: '0px !important', width: '282px' },
      '.rdrMonth': {
         paddingBottom: '10px !important',
         width: '270px !important',
         '.rdrWeekDays': { width: '245px' },
         '.rdrMonthsVertical': { width: '270px !important' },
      },
      '.rdrDayPassive span': { color: ' #d5dce0' },
   };
});
