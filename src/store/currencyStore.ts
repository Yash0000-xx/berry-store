import { create } from 'zustand';

type CurrencyType = 'INR' | 'USD' | 'AED';

interface CurrencyState {
  currency: CurrencyType;
  setCurrency: (currency: CurrencyType) => void;
  formatPrice: (priceInINR: number) => string;
}

const RATES = {
  USD: 1,
  INR: 83.5,
  AED: 3.67,
};

const SYMBOLS: Record<CurrencyType, string> = {
  INR: '₹',
  USD: '$',
  AED: 'AED ',
};

export const useCurrencyStore = create<CurrencyState>((set, get) => ({
  currency: 'INR',
  setCurrency: (currency) => set({ currency }),
  formatPrice: (priceInINR) => {
    const { currency } = get();
    const converted = priceInINR * RATES[currency];
    
    // Format based on currency styling rules
    const locale = currency === 'INR' ? 'en-IN' : 'en-US';
    const formattedNumber = new Intl.NumberFormat(locale, {
      maximumFractionDigits: currency === 'INR' ? 0 : 2,
      minimumFractionDigits: currency === 'INR' ? 0 : 2,
    }).format(converted);

    return `${SYMBOLS[currency]}${formattedNumber}`;
  },
}));