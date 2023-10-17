export interface StatusCardProps {
   label: string;
   value: number;
   key?: string;
   variant: 'primary' | 'success' | 'error' | 'info' | 'gray' | 'black';
   isActive: boolean;
   onClick: () => void;
}
