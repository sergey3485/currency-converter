import * as React from 'react';
import styled from 'styled-components';
import * as colors from '@radix-ui/colors';
import { RiExchangeFill } from 'react-icons/ri';
import Select from 'react-select';

import { useCurrency } from '../modules/currency/hooks/useCurrency';

const Container = styled.div({
  display: 'flex',
  minHeight: '100vh',
  alignItems: 'center',
  // justifyContent: 'center',
  flexDirection: 'column',
});

const InputContainer = styled.div({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Wrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '@media (max-width: 768px)': {
    flexDirection: 'column',
  },
});

const Input = styled.input({
  '-moz-appearance': 'textfield',
  '::-webkit-outer-spin-button, ::-webkit-inner-spin-button': {
    '-webkit-appearance': 'none',
  },
  minWidth: 40,
  outline: 0,
  border: 'none',
  borderTop: '1px solid black',
  borderBottom: '1px solid black',
  borderLeft: '1px solid black',
  borderRadius: '4px 0 0 4px',
  padding: '6px 96px 6px 6px',
});

const SVGContainer = styled.div({
  display: 'flex',
  marginLeft: 8,
  marginRight: 8,
});

const Header = styled.h1({
  marginBottom: 128,
  marginTop: 128,

  '@media (max-width: 768px)': {
    marginBottom: 64,
    marginTop: 64,
  },
});

const selectStyles = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  menu: (provided) => ({
    ...provided,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  }),

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  container: (provided) => ({
    ...provided,
    border: 0,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  indicatorsContainer: (provided) => ({
    ...provided,
    border: 'none',
  }),

  singleValue: (provided) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const transition = 'opacity 300ms';

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return { ...provided, transition };
  },

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  control: (provided) => ({
    ...provided,
    border: 'none',
    borderTop: '1px solid black',
    borderBottom: '1px solid black',
    borderRight: '1px solid black',
    borderRadius: '0 4px 4px 0',
    boxShadow: 'none',
    ':hover': {
      color: 'black',
      borderColor: 'black',
    },
  }),
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

  const getOptions = () => {
    return Object.keys(currenciesList).map((key) => {
      return { value: key, label: key.toUpperCase() };
    });
  };

  return (
    <Container>
      <Header>Currency converter</Header>
      <Wrapper>
        <InputContainer>
          <Input value={fromValue === 0 ? '' : fromValue} type="number" onChange={changeFromValue} />
          <Select options={getOptions()} onChange={(event) => setFromCurrency(event?.value ?? '')} styles={selectStyles} />
        </InputContainer>

        <SVGContainer>
          <RiExchangeFill size={36} color={colors.violet.violet9} />
        </SVGContainer>

        <InputContainer>
          <Input type="number" onChange={changeToValue} value={toValue === 0 ? '' : toValue} />
          <Select options={getOptions()} onChange={(event) => setToCurrency(event?.value ?? '')} styles={selectStyles} />
        </InputContainer>
      </Wrapper>
    </Container>
  );
};
