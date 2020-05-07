import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../../app/ducks/orders';

import useImmer from '../../../common/hooks/useImmer';
import { validateInput } from '../../../common/validation/inputValidation';
import { initialOrderForm } from './orderForm.model';
import Button from '../../../common/ui/Button';
import InputGroup from '../../../common/ui/InputGroup';

export function ContactData({ email }) {
  const [orderForm, updateOrderForm] = useImmer(initialOrderForm);
  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    const result = Object.values(orderForm).reduce(
      (isValid, formObject) => isValid && formObject.valid,
      true
    );
    setIsFormValid(result);
  }, [orderForm]);

  const handleInputChange = (e, id) => {
    const value = e.target.value;
    const isValid = validateInput(value, orderForm[id].validation);
    updateOrderForm((d) => {
      d[id].value = value;
      d[id].touched = true;
      d[id].valid = isValid;
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const orderInputs = Object.keys(orderForm).map((id) => ({
    id,
    ...orderForm[id],
  }));

  const inputControls = orderInputs.map((v, i) => {
    return (
      <InputGroup
        key={v.id}
        inputType={v.inputType}
        config={v.config}
        value={v.value}
        touched={v.touched}
        valid={v.valid}
        // autoFocus on page-load if it's the first input in the form
        autoFocus={i === 0}
        handleInputChange={(e) => handleInputChange(e, v.id)}
      />
    );
  });

  return (
    <div className={`ContactData`}>
      <h2>Order Form</h2>
      <form onSubmit={handleFormSubmit}>
        {inputControls}
        <Button variant="success" disabled={!isFormValid}>
          Order
        </Button>
      </form>
    </div>
  );
}

const mapState = (state) => {
  const {
    burgerBuilder: { ingredients, price },
  } = state;
  return { ingredients, price };
};

export default connect(mapState, actionCreators)(ContactData);
