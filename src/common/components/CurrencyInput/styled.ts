import styled from 'styled-components';

export const InputContainer = styled.div({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const Input = styled.input({
  '-moz-appearance': 'textfield',
  '::-webkit-outer-spin-button, ::-webkit-inner-spin-button': {
    '-webkit-appearance': 'none',
  },
  minWidth: 40,
  outline: 0,
  border: '1px solid black',
  borderRadius: '4px 0 0 4px',
  padding: 6,
});

export const selectStyles = {
  container: (provided) => ({
    ...provided,
    border: 0,
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    border: 'none',
  }),

  singleValue: (provided) => {
    const transition = 'opacity 300ms';

    return { ...provided, transition };
  },

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
