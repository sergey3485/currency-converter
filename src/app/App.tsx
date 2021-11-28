import * as React from 'react';
import styled from 'styled-components';
import * as colors from '@radix-ui/colors';
import { RiExchangeFill } from 'react-icons/ri';

import { CurrencyInput } from '../common/components/CurrencyInput';
import { useCurrency } from '../modules/currency/hooks/useCurrency';
import { Currencies } from '../modules/currency/api';

const Container = styled.div({
  display: 'flex',
  minHeight: '100vh',
  alignItems: 'center',
  flexDirection: 'column',
});

const Wrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '@media (max-width: 768px)': {
    flexDirection: 'column',
  },
});

const SVGContainer = styled.div({
  display: 'flex',
  marginLeft: 8,
  marginRight: 8,

  '@media (max-width: 768px)': {
    marginBottom: 8,
    marginTop: 8,
  },
});

const Header = styled.h1({
  marginBottom: 128,
  marginTop: 128,

  '@media (max-width: 768px)': {
    marginBottom: 64,
    marginTop: 64,
  },
});

const getOptions = (data: Currencies) => {
  return Object.keys(data).map((key) => {
    return { value: key, label: key.toUpperCase() };
  });
};

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

  const options = getOptions(currenciesList);

  return (
    <Container>
      <Header>Currency converter</Header>

      <Wrapper>
        <CurrencyInput
          value={fromValue === 0 ? '' : fromValue}
          options={options}
          onInputChange={changeFromValue}
          onCurrencyChange={(event) => setFromCurrency(event?.value ?? '')}
        />

        <SVGContainer>
          <RiExchangeFill size={36} color={colors.violet.violet9} />
        </SVGContainer>

        <CurrencyInput
          value={toValue === 0 ? '' : toValue}
          options={options}
          onInputChange={changeToValue}
          onCurrencyChange={(event) => setToCurrency(event?.value ?? '')}
        />
      </Wrapper>
    </Container>
  );
};
