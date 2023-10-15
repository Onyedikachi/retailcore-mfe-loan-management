import { CustomerData } from '@app/@types/customer';
import { Colors } from '@app/constants/colors';

export const customerInfo = (customer: CustomerData) => {
   const profile = customer?.customer_profiles[0];
   const { firstName, surname, otherNames, bvn, mobileNumber } = profile;

   return [
      { key: 'Customer Name', value: `${firstName} ${otherNames ?? ''} ${surname}` },
      { key: 'Customer ID', value: profile.customerNumber },
      { key: 'Customer Type', value: customer.customerType },
      { key: 'Status', value: customer.status },
      { key: 'BVN', value: bvn },
      { key: 'Phone Number', value: mobileNumber },
      { key: 'Email Address', value: profile.email ?? profile.emailAddress ?? '' },
      { key: 'Customer Persona', value: '' },
      { key: 'KYC Status', value: '' },
      { key: 'Risk Status', value: customer.riskStatus },
      { key: 'Relationship Manager', value: profile.relationshipOfficer },
      { key: 'Email Address', value: '' },
   ];
};

export const colors = [
   { color: Colors.DarkGreen, bgcolor: Colors.BgCardSuccess },
   { color: Colors.DarKRed, bgcolor: Colors.BgCardRed },
   { color: '#806B00', bgcolor: '#FFF8CC' },
];

export const riskStatusColor = (riskStatus?: string) => {
   switch (riskStatus) {
      case 'LOW':
         return 'success.main';
      case 'MEDIUM':
         return colors[1].color;
      case 'HIGH':
         return 'primary.main';
      default:
         return colors[0].color;
   }
};
