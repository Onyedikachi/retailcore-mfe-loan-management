export const EligibilitySecurity = {
   guarantor: {
      endpointKey: 'guarantor',
      actionButtonText: 'Select applicable supporting documents',
      modalTitle: 'SUPPORTING DOCUMENTS',
      modalButtonText: 'Add New Document',
      optionValue: 'Guarantor',
      formFieldName: 'guarantor_ids',
   },
   collateral: {
      endpointKey: 'collateral-assets',
      actionButtonText: 'Select applicable collateral assets',
      modalTitle: 'COLLATERAL ASSETS',
      modalButtonText: 'Add New Security',
      optionValue: 'Collateral Assets',
      formFieldName: 'collateral_asset_ids',
   },
   other: {
      endpointKey: 'other-sec-requirements',
      actionButtonText: 'Select applicable security requirements',
      modalTitle: 'OTHER SECURITIES',
      modalButtonText: 'Add New Security',
      optionValue: 'Other Security Requirements',
      formFieldName: 'other_security_requirement_ids',
   },
};
