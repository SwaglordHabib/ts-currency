import { CurrencySchema, Currency } from './types';
import _currencyData from '../data/currencyData.json';

const CurrencyData: CurrencySchema = _currencyData as unknown as CurrencySchema;

export default CurrencyData;

/**
 * A list of all currency codes
 */
export const CurrencyCodes: string[] = CurrencyData.currencies.map(
  (element) => element.code,
);

/**
 * A list of all currency names
 */
export const CurrencyNames: string[] = CurrencyData.currencies.map(
  (element) => element.name,
);

/**
 * A list of all currency countries
 */
export const CurrencyDataArray: Currency[] = CurrencyData.currencies;

/**
 * A map of all currency codes to their respective names
 */
export const CurrencyCodeToNameMap: Map<string, string> = new Map(
  CurrencyData.currencies.map((element) => [element.code, element.name]),
);

/**
 * A list of all currency names to currency symbols
 */
export const CurrencyNameToSymbolMapByLocale: (
  locale: string,
) => { code: string; symbol: string }[] = (locale: string) =>
  CurrencyData.currencies.map((element) => ({
    code: element.code,
    symbol: element.symbol,
  }));
