import { CustomerData } from '@app/@types/customer';
import { format } from 'date-fns';

export const customerInfo = (customer?: CustomerData) => {
   const profile = customer?.customer_profiles?.[0];

   return {
      biodata: [
         { key: 'Title', value: profile?.title },
         { key: 'Surname', value: profile?.surname },
         { key: 'First Name', value: profile?.firstName },
         { key: 'Other Names', value: profile?.otherNames },
         { key: 'Mother’s Maiden Name', value: profile?.mothersMaidenName },
         { key: 'Gender', value: profile?.gender },
         { key: 'Marital Status', value: profile?.maritalStatus },
         { key: 'Date of Birth ', value: format(new Date(profile?.dateOfBirth ?? ''), 'yyyy-MM-dd') },
         { key: 'Country', value: profile?.country },
         { key: 'State of Origin', value: profile?.stateOfOrigin },
         { key: 'LGA', value: profile?.lga },
         { key: 'City/Town', value: profile?.cityTown },
         { key: 'Dual Citizen', value: profile?.dualCitizenship },
         { key: 'If yes specify:', value: profile?.ifYesSpecify },
      ],
      idVerification: [
         { key: 'BVN', value: profile?.bvn },
         { key: 'Choose an ID', value: profile?.chooseAnId },
         { key: 'ID Number', value: profile?.idNumber },
         { key: 'Issue Date', value: profile?.issueDate },
         { key: 'Expiry Date', value: profile?.expiryDate },
      ],
      contactInfo: [
         { key: 'Residential Address', value: profile?.residentialAddress },
         { key: 'Detailed Address Description', value: profile?.detailedAddressOfResidentialAddress },
         { key: 'Country', value: profile?.residentialAddressCountry },
         { key: 'State', value: profile?.residentialAddressState },
         { key: 'City/Town', value: profile?.residentialAddressCity },
         { key: 'LGA', value: profile?.residentialAddressLGA },
         { key: 'Mobile Number', value: profile?.mobileNumber },
         { key: 'Alternative Phone Number', value: profile?.alternateMobileNumber },
         { key: 'Email Address', value: profile?.email ?? profile?.emailAddress },
         {
            key: 'Mail Address is the same as residential Address',
            value: profile?.mailingAddressSameAsResidentialAddress,
         },
      ],
      nextOfKin: [
         { key: 'Title', value: profile?.donok_title },
         { key: 'Surname', value: profile?.donok_surname },
         { key: 'First Name', value: profile?.donok_firstName },
         { key: 'Other Names', value: profile?.donok_otherNames },
         { key: 'Relationship', value: profile?.relationship },
         { key: 'Gender', value: profile?.donok_gender },
         { key: 'Date of Birth ', value: profile?.donok_dateOfBirth },
         { key: 'Residential Address', value: profile?.donok_detailedDescriptionOfResidentialAddress },
      ],
   };
};
