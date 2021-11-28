import * as React from 'react';
import Select, {
  OptionsOrGroups,
  GroupBase,
  ActionMeta,
  SingleValue,
} from 'react-select';

import * as S from './styled';

export interface CurrencyOption {
  value: string;
  label: string;
}

export interface CurrencyInputProps {
  value: string | number;
  options: OptionsOrGroups<CurrencyOption, GroupBase<CurrencyOption>>;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onCurrencyChange: ((newValue: SingleValue<CurrencyOption>, actionMeta: ActionMeta<CurrencyOption>) => void);
}

export const CurrencyInput = (props: CurrencyInputProps): JSX.Element => {
  const {
    value,
    onInputChange,
    options,
    onCurrencyChange,
  } = props;

  return (
    <S.InputContainer>
      <S.Input value={value} type="number" onChange={onInputChange} />
      <Select options={options} onChange={onCurrencyChange} styles={S.selectStyles} />
    </S.InputContainer>
  );
};
