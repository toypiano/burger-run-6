import React from 'react';
import styled, { css } from 'styled-components';

const invalidCss = css`
  border: 1px solid red;
  background: rgba(255, 240, 240, 0.8);
`;

const StyledInput = styled.div`
  font: inherit;
  font-size: 1.2rem;
  padding: 0.5em 1em;
  width: 100%;
  border: 1px solid var(--cl-gray);
  border-radius: 8px;
  margin: 0.5em 0 1.25em;
  ${(props) => (props.touched && !props.valid ? invalidCss : null)}

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
  ::placeholder {
    opacity: 0.8;
  }
`;

const StyledInputGroup = styled.div`
  label {
    display: block;
    opacity: 0.9;
  }
`;

function Input({
  inputType,
  config,
  value,
  touched,
  valid,
  autoFocus,
  handleInputChange,
}) {
  switch (inputType) {
    case 'input':
      return (
        <StyledInput
          as="input"
          {...config}
          value={value}
          touched={touched}
          valid={valid}
          autoFocus={autoFocus}
          onChange={handleInputChange}
        />
      );
    case 'textarea':
      return (
        <StyledInput
          as="textarea"
          {...config}
          value={value}
          touched={touched}
          valid={valid}
          autoFocus={autoFocus}
          onChange={handleInputChange}
        />
      );
    case 'select':
      return (
        <StyledInput
          as="select"
          value={value}
          touched={touched}
          valid={valid}
          autoFocus={autoFocus}
          onChange={handleInputChange}
        >
          {config.options.map((opt) => {
            if (opt.value) {
              return (
                <option key={opt.value} value={opt.value}>
                  {opt.text}
                </option>
              );
            }
            return (
              <option key="placeholder" value="" disabled>
                {opt.text}
              </option>
            );
          })}
        </StyledInput>
      );
    default:
      throw new Error('invalid input type');
  }
}

function InputGroup({
  inputType,
  config,
  value,
  touched,
  valid,
  autoFocus,
  handleInputChange,
}) {
  return (
    <StyledInputGroup>
      <label>{config.label}</label>
      <Input
        inputType={inputType}
        config={config}
        value={value}
        touched={touched}
        valid={valid}
        autoFocus={autoFocus}
        handleInputChange={handleInputChange}
      />
    </StyledInputGroup>
  );
}

export default InputGroup;
