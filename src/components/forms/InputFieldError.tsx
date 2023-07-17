import { Box } from '@mui/system';

type InputErrorTextProps = { errorText: string };
export const InputErrorText = ({ errorText }: InputErrorTextProps) => {
   return <Box sx={{ color: 'red', fontSize: '12px' }}>{errorText}</Box>;
};
