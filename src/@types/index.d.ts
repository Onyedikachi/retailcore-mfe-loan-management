export type IconType =
   | 'filter'
   | 'eye'
   | 'arrow-right'
   | 'open-link'
   | 'three-bar'
   | 'block'
   | 'add-circle'
   | 'close'
   | 'check-circle';

export * from './currency-list';

export interface MenuItemContentsProps {
   label: string;
   href?: string;
}

export type FormAcceptType = 'currency' | 'number' | 'ratio' | 'percent';

export type SecurityEligibilityDocumentType = 'guarantor' | 'collateral-assets' | 'other-sec-requirements';
export type ObjectAny = { [key: string]: any };
