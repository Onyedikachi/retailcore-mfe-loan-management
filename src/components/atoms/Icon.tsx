import { IconType } from '@app/@types';
import {
   ArrowRightOutlined,
   BlockOutlined,
   DehazeOutlined,
   Filter1Outlined,
   LaunchOutlined,
   SvgIconComponent,
   VisibilityOutlined,
   AddCircle,
   Close,
   CheckCircle,
} from '@mui/icons-material';
import { SvgIconProps } from '@mui/material';

export const Icons: Record<IconType, SvgIconComponent> = {
   filter: Filter1Outlined,
   eye: VisibilityOutlined,
   'arrow-right': ArrowRightOutlined,
   'open-link': LaunchOutlined,
   'three-bar': DehazeOutlined,
   block: BlockOutlined,
   'add-circle': AddCircle,
   close: Close,
   'check-circle': CheckCircle,
};

export interface IconProps extends Omit<SvgIconProps, 'name'> {
   type: IconType;
}

export const Icon = ({ type, ...restProps }: IconProps) => {
   const IconElement = Icons[type];
   return <IconElement {...restProps} />;
};
