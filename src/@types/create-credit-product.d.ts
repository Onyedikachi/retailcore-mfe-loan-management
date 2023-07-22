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
   product_name: string;
   product_description: string;
   currency?: string;
   currency_id?: string;
   min_loan_tenure: number;
   min_loan_tenure_period: string;
   max_loan_tenure: number;
   max_loan_tenure_period: string;
   min_loan_principal: string;
   max_loan_principal: string;
   allow_multiple_req: boolean;
   is_draft?: boolean;
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
