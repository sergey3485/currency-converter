import * as React from 'react';
import styled from 'styled-components';
import * as colors from '@radix-ui/colors';
import { RiExchangeFill } from 'react-icons/ri';

import { useCurrency } from '../modules/currency/hooks/useCurrency';

const Container = styled.div({
  display: 'flex',
  minHeight: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
});

const ConvertButton = styled.button({
  all: 'unset',
  width: 36,
  height: 36,
  cursor: 'pointer',
  color: colors.violet.violet9,
  marginLeft: 8,

  '&:hover': {
    color: colors.violet.violet10,
  },
});

const InputValue = styled.input`
-moz-appearance: textfield;
::-webkit-outer-spin-button,
::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
min-width: 40px;
margin-right: 8px;
outline: 0;
border: 1px solid black;
border-radius: 4px;
padding-left: 10px;
`;

export const App = (): JSX.Element => {
  const [fromValue, setFromValue] = React.useState<number>(0);
  const [toValue, setToValue] = React.useState<number>(0);
  const [fromCurrency, setFromCurrency] = React.useState<string>('');
  const [toCurrency, setToCurrency] = React.useState<string>('');

  const { currenciesList, currencyRate, currencyResult } = useCurrency(fromValue, fromCurrency, toCurrency);

  React.useEffect(() => {
    setToValue(Number((currencyResult).toFixed(2)));
  }, [currencyResult]);

  const changeFromValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.currentTarget.value);
    setFromValue(newValue);
    setToValue(Number((newValue * currencyRate).toFixed(2)));
  };

  const changeToValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newToValue = Number(event.currentTarget.value);
    setToValue(newToValue);
    setFromValue(Number((newToValue / currencyRate).toFixed(2)));
  };

  return (
    <Container>
      <InputValue value={fromValue === 0 ? '' : fromValue} type="number" onChange={changeFromValue} />
      <select onChange={(event) => setFromCurrency(event.currentTarget.value)} value={fromCurrency}>
        <option disabled value="" hidden label=" ">select currency</option>
        {Object.entries(currenciesList).map((data) => (
          <option key={data[0]}>{data[0]}</option>
        ))}
      </select>

      <RiExchangeFill size={36} color={colors.violet.violet9} />

      <InputValue type="number" onChange={changeToValue} value={toValue === 0 ? '' : toValue} />
      <select onChange={(event) => setToCurrency(event.currentTarget.value)} value={toCurrency}>
        <option disabled value="" hidden label=" ">select currency</option>
        {Object.entries(currenciesList).map((data) => (
          <option key={data[0]}>{data[0]}</option>
        ))}
      </select>
    </Container>
  );
};
