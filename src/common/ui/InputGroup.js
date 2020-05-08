import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.div`
  font: inherit;
  margin: 1em;
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

const StyledInputGroup = styled.div``;

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
