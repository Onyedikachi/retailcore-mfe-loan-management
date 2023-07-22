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
   product_info_id: string;
   require_earning: boolean;
   earn_type: string;
   earn_value: number;
   earn_period_value: string;
   earn_period: string;
   require_security: boolean;
   require_other_elig_criteria: boolean;
   is_draft: boolean;
   equity_contrib_type: 'fixed' | 'range';
   contrib_value_from: number;
   contrib_value_to: number;
}

export interface CreateCreditProduct {
   productInformation?: ProductInformation;
   eligibityCriteria?: EligibilityCriteria;
}
