import { IntRateConfigBand, LoanProductData } from '@app/@types/loan-product';

export const findInterestRates = (
   selectedProduct?: LoanProductData,
   principal?: number
): { minInterestRate: number; maxInterestRate: number } => {
   const pricingConfig = Array.isArray(selectedProduct?.pricingConfiguration)
      ? selectedProduct?.pricingConfiguration[0]
      : selectedProduct?.pricingConfiguration;
   const intRateConfigBand: IntRateConfigBand[] = pricingConfig?.intRateConfigBand
      ? JSON.parse(pricingConfig?.intRateConfigBand ?? '')
      : [];

   if (intRateConfigBand?.length === 1 || !principal) {
      return {
         minInterestRate: intRateConfigBand[0]?.MinInterestRate,
         maxInterestRate: intRateConfigBand[0]?.MaxInterestRate,
      };
   } else {
      const matchingItems = intRateConfigBand.filter((item) => {
         const minPrincipal = parseFloat(item?.MinPrincipalValue ?? '0');
         const maxPrincipal = parseFloat(item?.MaxPrincipalValue ?? 'Infinity');
         return principal >= minPrincipal && principal <= maxPrincipal;
      });
      if (matchingItems.length > 0) {
         return {
            minInterestRate: matchingItems[0]?.MinInterestRate,
            maxInterestRate: matchingItems[0]?.MaxInterestRate,
         };
      } else {
         return {
            minInterestRate: intRateConfigBand[0]?.MinInterestRate,
            maxInterestRate: intRateConfigBand[0]?.MaxInterestRate,
         };
      }
   }
};
export const eligibilityCriteria = (selectedProduct?: LoanProductData) =>
   Array.isArray(selectedProduct?.productEligibilityCriteriaRequirement)
      ? selectedProduct?.productEligibilityCriteriaRequirement[0]
      : selectedProduct?.productEligibilityCriteriaRequirement;
