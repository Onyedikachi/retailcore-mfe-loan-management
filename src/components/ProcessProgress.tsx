import { Colors } from '@app/constants/colors';
import { Box, Typography } from '@mui/material';
import { PaddedContainer } from './containers/PaddedContainer';
import { SterlingBar } from './atoms/SterlingBar';

interface ProcessProgressProp {
   percentage: number;
   currentLabel: string;
   endLabel: string;
   title?: string;
}

export const ProcessProgress: React.FC<ProcessProgressProp> = (props) => {
   return (
      <PaddedContainer>
         <Typography mb={3}>{props.title ?? 'Processing status:'}</Typography>
         <Box display="flex" alignItems="center" width="100%" pl={5}>
            <SterlingBar style={{ zIndex: 1, width: `${props.percentage}%` }} color={Colors.Primary} />
            <SterlingBar
               style={{ marginLeft: -5, width: `${100 - props.percentage}%` }}
               opacity={0.6}
               color={Colors.LightGray1}
            />
         </Box>
         <Box display="flex" justifyContent="space-between" mt={1}>
            <Typography variant="body2">{props.currentLabel}</Typography>
            <Typography variant="body2">{props.endLabel}</Typography>
         </Box>
      </PaddedContainer>
   );
};
