
export interface CurrencySchema {
    version: string;
    currencies: Currency[];
}

export interface Currency {
    name: string;
    code: string;
    country: string;
    decimals: number;
    symbol: string;
}
