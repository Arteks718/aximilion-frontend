export const currencyMap: Record<string, string> = { USD: '$', EUR: '€', UAH: '₴', ETH: 'Ξ', BTC: '₿' };

export function getCurrencySymbol(currency: string | undefined): string {
  if (!currency) return '$';
  return currencyMap[currency.toUpperCase()] || currency || '$';
}
