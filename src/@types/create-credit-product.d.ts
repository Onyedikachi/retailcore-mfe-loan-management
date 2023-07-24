export interface Tenure {
   count: number;
   period: string;
}

export interface FixedEligibilityCriteria {
   earnings: 'fixed';
   amount: number;
   period: Tenure;
}

export type SecurityOptions = 'guarantor' | 'collateral' | 'other';

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

export interface ProductInformationApiResponse {
   data: {
      productInfo: ProductInformation & { id: string };
   };
}

export interface EligibilityCriteria {
   product_info_id: string;
   require_earning: boolean;
   earn_type: string;
   earn_value: number | string;
   earn_period_value: string;
   earn_period: string;
   require_security: boolean;

   guarantor_ids: Array<string>;
   collateral_asset_ids: Array<string>;
   other_security_requirement_ids: Array<string>;
   require_contrib: boolean;
   require_other_elig_criteria: boolean;
   is_draft: boolean;
   equity_contrib_type: string;
   contrib_value_from: number | string;
   contrib_value_to: number | string;
}

export interface CreateCreditProduct {
   productInformation?: Partial<ProductInformation>;
   eligibityCriteria?: Partial<EligibilityCriteria>;
}
