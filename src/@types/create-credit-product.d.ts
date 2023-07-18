export interface Tenure {
   count: number;
   period: string;
}

export interface FixedEligibilityCriteria {
   earnings: 'fixed';
   amount: number;
   period: Tenure;
}

export interface PercentEligibilityCriteria {
   earnings: 'percent';
   percentage: number;
   period: Tenure;
}

export interface FixedContribution {
   type: 'fixed';
   percent: number;
}

export interface RangeContribution {
   type: 'range';
   min: number;
   max: number;
}

export interface ProductInformation {
   productName: string;
   description: string;
   currency: string;
   minLoanTenure: Tenure;
   maxLoanTenure: Tenure;
   minLoanPrincipal: number;
   maxLoanPrincipal: number;
   multipleLoanRequest: boolean;
}

export interface EligibilityCriteria {
   earnings?: PercentEligibilityCriteria | FixedEligibilityCriteria;
   equityContribution?: ProductInformation | RangeContribution;
   securityOptions: {
      guarantors: string[];
      collateralAssets: Array<{
         name: string;
         mmv: number;
      }>;
      others: string[];
   };
   others: Array<{
      name: string;
      periodicity: {
         start?: number;
         end?: number;
         type: string;
      };
      acceptedFormats: string[];
   }>;
}

export interface CreateCreditProduct {
   productInformation?: ProductInformation;
   eligibityCriteria?: EligibilityCriteria;
}
