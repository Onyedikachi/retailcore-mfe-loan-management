import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { Colors } from '@app/constants/colors';
import styled from '@emotion/styled';

export const StyledDateRange = styled(DateRangePicker)(() => {
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
      '.rdrMonthAndYearPickers': { fontSize: '16px !important' },
      '& .rdrStaticRangeLabel': {
         color: '#636363 !important',
         fontFamily: ['Inter'].join(','),
         fontSize: '14px',
         fontWeight: '500 !important',
         '& :hover': { backgroundColor: `none !important` },
      },
      '& .rdrStaticRangeSelected': {
         backgroundColor: `#F9E5E5 !important`,
         '&:hover': { backgroundColor: `#F9E5E5 !important` },
      },
      '.rdrDateDisplayWrapper, .rdrInputRanges': { display: 'none' },
      '& .rdrWeekDay': { fontSize: '10px', lineHeight: '1.667em' },
      '.rdrMonth': { width: '270px !important', paddingBottom: '10px !important' },
      '.rdrDayNumber span': {
         fontSize: '14px',
         fontWeight: '500 !important',
         color: '#636363',
      },
      '.rdrStartEdge, .rdrEndEdge, .rdrInRange': {
         '& ~ .rdrDayNumber span': {
            color: `${Colors.Primary} !important`,
         },
      },
      '.rdrDayToday .rdrDayNumber': {
         ' span:after': {
            background: `${Colors.Primary} !important`,
         },
      },
      '.rdrDayEndPreview, .rdrDayEndOfWeek, .rdrDayWeekend, .rdrEndEdge': {
         borderTopRightRadius: '2px !important',
         borderBottomRightRadius: '2px !important',
      },
      '.rdrDayStartPreview, .rdrDayStartOfWeek, .rdrDayWeekend,  .rdrStartEdge': {
         borderTopLeftRadius: '2px !important',
         borderBottomLeftRadius: '2px !important',
      },
      '.rdrDay, .rdrDayHovered, .rdrDayWeekend, .rdrDayActive, .rdrDayPreview, .rdrSelected .rdrInPreview': {
         borderRadius: '2px !important',
      },
      '.rdrDayStartOfWeek .rdrInRange, .rdrDay .rdrInRange, rdrDayEndOfWeek .rdrInRange, .rdrDayStartOfMonth, .rdrDayEndOfMonth':
         {
            borderRadius: '2px !important',
         },
      '.rdrMonthAndYearWrapper': { paddingTop: '0px !important' },
      '.rdrDayPassive span': { color: ' #d5dce0' },
   };
});
