export type Currencies = Record<string, string>;

export interface Rate {
  date: string;
  rate: number;
}

export const fetchCurrencies = async (): Promise<Currencies> => {
  const fetchData = await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json');
  const data = await fetchData.json() as Currencies;

  return data;
};

export const fetchRate = async (from: string, to: string): Promise<Rate> => {
  const fetchData = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}/${to}.json`);
  const data = await fetchData.json() as Record<string, string | number>;

  return {
    date: data.date as string,
    rate: data[to] as number,
  };
};
