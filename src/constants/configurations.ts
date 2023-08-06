import { BasePath } from './routes';

export const ProductTypes = {
   PERSONAL: 'Personal',
   COMMERCIAL: 'Commercial',
};

// export const ProductTypeSubMenu = {
//    COMMERCIAL: 'Commercial',
//    DIGITAL_CHANNELS: 'Digital Channels',
//    OVER_THE_COUNTER: 'Over the Counter',
//    CHEQUES_PHYSICAL: 'Cheques/Physical instruction',
// };

export const ProductTypesMenuOptions = [
   { label: ProductTypes.PERSONAL, href: `/${BasePath}` },
   { label: ProductTypes.COMMERCIAL, href: '#' },
];

// const CreateDepositPath = `${BasePath}/create/${ProductTypes.DEPOSIT.toLowerCase()}`;
// export const DepositLoanTypeMenuOptions = [
//    { label: 'Savings', href: `${CreateDepositPath}/savings` },
//    { label: 'Current', href: `${CreateDepositPath}/current` },
//    { label: 'Term Deposit', href: `${CreateDepositPath}/term-deposit` },
// ];

// const CreateCreditPath = `${BasePath}/create/${ProductTypes.CREDIT.toLowerCase()}`;
// export const CreditLoanTypeMenuOptions = [
//    { label: 'Personal Loans', href: `${CreateCreditPath}/personal-loans` },
//    { label: ProductTypeSubMenu.COMMERCIAL },
// ];

// export const CommercialLoanTypeMenuOptions = [
//    { label: 'SME Loans', href: `${CreateCreditPath}/sme` },
//    { label: 'Corporate Loans', href: `${CreateCreditPath}/corporate` },
// ];

// export const PaymentsLoanTypeMenuOptions = [
//    { label: ProductTypeSubMenu.COMMERCIAL },
//    { label: ProductTypeSubMenu.OVER_THE_COUNTER },
//    { label: ProductTypeSubMenu.CHEQUES_PHYSICAL },
// ];

// const CreatePaymentPath = `${BasePath}/create/${ProductTypes.PAYMENTS.toLowerCase()}`;
// const getPaymentMenuOptions = (basePath: string) => [
//    { label: 'Cash Withdrawal', href: `${basePath}/cash-withdrawal` },
//    { label: 'Within Bank Transfer', href: `${basePath}/intra` },
//    { label: 'Other Bank Transfer', href: `${basePath}/inter` },
//    { label: 'International Transfer', href: `${basePath}/international` },
// ];

// export const DigitalChannelsTypeMenuOptions = getPaymentMenuOptions(CreatePaymentPath);
// export const OverTheCounterTypeMenuOptions = getPaymentMenuOptions(CreatePaymentPath);

// export const ChequePhysicalTypeMenuOptions = [
//    { label: 'Personal Cheque', href: `${CreatePaymentPath}/personal` },
//    // eslint-disable-next-line quotes
//    { label: "Manager's Cheque", href: `${CreatePaymentPath}/manager` },
// ];

// export const CreateProductRouteMenuItems = {
//    [ProductTypes.DEPOSIT]: DepositLoanTypeMenuOptions,
//    [ProductTypes.CREDIT]: CreditLoanTypeMenuOptions,
//    [ProductTypes.PAYMENTS]: PaymentsLoanTypeMenuOptions,
// };

// export const CreateProductSubMenuItems = {
//    [ProductTypeSubMenu.CHEQUES_PHYSICAL]: ChequePhysicalTypeMenuOptions,
//    [ProductTypeSubMenu.COMMERCIAL]: CommercialLoanTypeMenuOptions,
//    [ProductTypeSubMenu.DIGITAL_CHANNELS]: DigitalChannelsTypeMenuOptions,
//    [ProductTypeSubMenu.OVER_THE_COUNTER]: OverTheCounterTypeMenuOptions,
// };
