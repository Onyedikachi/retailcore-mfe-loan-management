export * from './currency-list';

export type IconType = 'filter' | 'eye' | 'arrow-right' | 'open-link' | 'three-bar' | 'block';

export interface MenuItemContentsProps {
   label: string;
   href?: string;
}

export type SecurityEligibilityDocumentType = 'guarantor' | 'collateral-assets' | 'other-sec-requirements';
