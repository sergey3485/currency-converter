import * as React from 'react';

import {
  fetchCurrencies,
  Currencies,
  fetchRate,
  Rate,
} from '../api';

export interface UseCurrencyValue {
  currenciesList: Currencies;
  currencyRate: number;
  currencyResult: number;
}

export const useCurrency = (value: number, from?: string, to?: string): UseCurrencyValue => {
  const [currenciesList, setCurrenciesList] = React.useState<Currencies>({});
  const [rate, setRate] = React.useState<Rate>();

  React.useEffect(() => {
    fetchCurrencies()
      .then((data) => setCurrenciesList(data))
      .catch((error) => console.log(error));
  }, []);

  React.useEffect(() => {
    if (!from || !to) return;
    fetchRate(from, to)
      .then((data) => setRate(data))
      .catch((error) => console.log(error));
  }, [from, to]);

  const currencyRate = rate?.rate ?? 0;
  const currencyResult = value * currencyRate;

  return {
    currenciesList,
    currencyRate,
    currencyResult,
  };
};
