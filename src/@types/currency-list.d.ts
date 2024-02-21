export interface Currency {
   abbreviation: string;
   approved_by: string | null;
   created_at: string;
   /** A float value returned as string form API */
   created_exchange_rate: string;
   currency_decimal: number;
   exchange_currency: {
      id: string;
      name: string;
      abbreviation: string;
      is_default: boolean;
   };
   /** A float value returned as string form API */
   exchange_rate: string;
   has_posting: boolean;
   id: string;
   initiator: string;
   is_base: boolean;
   is_default: boolean;
   is_locked: boolean;
   mapped_to_leaf_ledger_count: number;
   mapped_to_ledger: boolean;
   name: string;
   state: string;
   updated_at: string;
}

export interface CurrencyListResponse {
   data: Array<Currency>;
   total: number;
   total_pages: number;
}
