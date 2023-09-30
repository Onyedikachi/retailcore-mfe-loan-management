import { RoutePaths } from './routes';

export const ProductTypes = {
   PERSONAL: 'Inidividual',
   COMMERCIAL: 'Commercial',
};

export const ProductTypesMenuOptions = () => [
   { label: ProductTypes.PERSONAL, href: RoutePaths.IndividualLoan.absolute },
   { label: ProductTypes.COMMERCIAL, href: '#' },
];
