import { CustomerData } from '@app/@types/customer';
import { Colors } from '@app/constants/colors';
import { StyledChip } from '@app/components/atoms';
import { BigStatusIndicator } from '@app/components/atoms/StatusIndicator';
import { Ellipsis } from '@app/components/atoms/Ellipsis';

export const customerInfo = (customer: CustomerData, persona?: string) => {
   const profile = customer?.customer_profiles[0];
   const { firstName, surname, otherNames, bvn, mobileNumber } = profile;
   const kycStatus =
      customer.status == 'Active' && customer.approvalStatus == 'Approved' ? 'Complete' : 'Incomplete';
   return [
      { key: 'Customer Name', value: `${firstName ?? ''} ${otherNames ?? ''} ${surname ?? ''}` },
      { key: 'Customer Number', value: profile.customerNumber },
      { key: 'Customer Type', value: customer.customerType },
      {
         key: 'Status',
         value: (
            <StyledChip
               component="span"
               sx={{ ...(customer.status == 'Active' ? colors[0] : colors[1]) }}
               label={customer.status}
            />
         ),
      },
      { key: 'BVN', value: bvn },
      { key: 'Phone Number', value: mobileNumber },
      { key: 'Email Address', value: <Ellipsis text={profile.email ?? profile.emailAddress ?? '-'} /> },
      { key: 'Customer Persona', value: persona },
      {
         key: 'KYC Status',
         value: (
            <>
               <BigStatusIndicator sx={{ color: kycStatus == 'Complete' ? 'success.main' : colors[1] }} />

               {kycStatus ?? '-'}
            </>
         ),
      },
      { key: 'Risk Status', value: customer.riskStatus },
      { key: 'Relationship Manager', value: profile.relationshipOfficer },
      { key: 'Email Address ', value: '' },
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
      case 'High Net-Worth':
         return 'info.main';
      default:
         return 'primary.main';
   }
};
