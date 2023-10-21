import { Colors } from '@app/constants';

interface PlaceholderProp {
   text: string;
}

export const SelectPlaceholder: React.FC<PlaceholderProp> = ({ text }) => {
   return <span style={{ color: Colors.LightGray4 }}>{text}</span>;
};
