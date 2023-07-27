import { Colors } from '@app/constants';
import { Box } from '@mui/system';

type InputErrorTextProps = { errorText: string };
export const InputErrorText = ({ errorText }: InputErrorTextProps) => {
   return <Box sx={{ color: 'red', fontSize: '12px' }}>{errorText}</Box>;
};

export const InputSuccessText = ({ successText }: { successText: string }) => {
   return <Box sx={{ color: Colors.Success, fontSize: '12px' }}>{successText}</Box>;
};
