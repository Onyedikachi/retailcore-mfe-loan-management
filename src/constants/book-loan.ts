import { IntRateConfigBand, LoanProductData } from '@app/@types/loan-product';

export const findInterestRates = (
   selectedProduct?: LoanProductData,
   principal?: number
): { minInterestRate: number; maxInterestRate: number } => {
   if (selectedProduct?.minInterestRate && selectedProduct?.maxInterestRate) {
      if ((selectedProduct?.minInterestRate ?? 0) > 0 && (selectedProduct?.maxInterestRate ?? 0) > 0) {
         return {
            minInterestRate: selectedProduct?.minInterestRate,
            maxInterestRate: selectedProduct?.maxInterestRate,
         };
      }
   }
   const pricingConfig = Array.isArray(selectedProduct?.pricingConfiguration)
      ? selectedProduct?.pricingConfiguration[0]
      : selectedProduct?.pricingConfiguration;
   const intRateConfigBand: IntRateConfigBand[] = pricingConfig?.intRateConfigBand
      ? JSON.parse(pricingConfig?.intRateConfigBand ?? '')
      : [];

   if (intRateConfigBand?.length === 1 || !principal) {
      return {
         minInterestRate: intRateConfigBand[0]?.MinInterestRate ?? 0,
         maxInterestRate: intRateConfigBand[0]?.MaxInterestRate ?? 0,
      };
   } else {
      const matchingItems = intRateConfigBand.filter((item) => {
         const minPrincipal = parseFloat(item?.MinPrincipalValue ?? '0');
         const maxPrincipal = parseFloat(item?.MaxPrincipalValue ?? 'Infinity');
         return principal >= minPrincipal && principal <= maxPrincipal;
      });
      if (matchingItems.length > 0) {
         return {
            minInterestRate: matchingItems[0]?.MinInterestRate ?? 0,
            maxInterestRate: matchingItems[0]?.MaxInterestRate ?? 0,
         };
      } else {
         return {
            minInterestRate: intRateConfigBand[0]?.MinInterestRate ?? 0,
            maxInterestRate: intRateConfigBand[0]?.MaxInterestRate ?? 0,
         };
      }
   }
};
export const eligibilityCriteria = (selectedProduct?: LoanProductData) =>
   Array.isArray(selectedProduct?.productEligibilityCriteriaRequirement)
      ? selectedProduct?.productEligibilityCriteriaRequirement[0]
      : selectedProduct?.productEligibilityCriteriaRequirement;

export const getChargeTaxPenalty = (selectedProduct?: LoanProductData): any | undefined => {
   if (
      selectedProduct &&
      selectedProduct.chargesTaxesPenalty &&
      'isPenaltyReq' in selectedProduct.chargesTaxesPenalty
   ) {
      return selectedProduct.chargesTaxesPenalty.isPenaltyReq;
   }
   return undefined;
};

export const interestRateFinder = (
   selectedProduct?: LoanProductData,
   principal?: number
): { minInterestRate: number; maxInterestRate: number } | null => {
   if (!selectedProduct || !principal) {
      return null;
   }

   const pricingConfig: any = selectedProduct.pricingConfiguration;

   if (!pricingConfig || !pricingConfig.intRateConfigBand) {
      return null;
   }

   for (const rateConfig of pricingConfig.intRateConfigBand) {
      const { minPrincipalValue, maxPrincipalValue, minInterestRate, maxInterestRate } = rateConfig;

      if (principal >= minPrincipalValue && principal <= maxPrincipalValue) {
         return { minInterestRate, maxInterestRate };
      }
   }

   return null;
};
