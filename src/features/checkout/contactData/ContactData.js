import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../../app/ducks/orders';

import { useHistory } from 'react-router-dom';
import useImmer from '../../../common/hooks/useImmer';
import { validateInput } from '../../../common/validation/inputValidation';
import { initialOrderForm } from './initialOrderForm';
import Button from '../../../common/ui/Button';
import InputGroup from '../../../common/ui/InputGroup';
import Spinner from '../../../common/ui/Spinner';

export function ContactData({
  email,
  postOrder,
  idToken,
  localId,
  ingredients,
  price,
}) {
  const [orderForm, updateOrderForm] = useImmer(initialOrderForm);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  // pre-fill email input
  useEffect(() => {
    updateOrderForm((d) => {
      d.email.value = email;
      d.email.touched = true;
      d.email.valid = true;
    });
  }, [email, updateOrderForm]);

  // validate input
  useEffect(() => {
    const isEveryInputValid = Object.values(orderForm).reduce(
      (isValid, input) => isValid && input.valid,
      true
    );
    setIsFormValid(isEveryInputValid);
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = Object.keys(orderForm).reduce((data, inputId) => {
      data[inputId] = orderForm[inputId].value;
      return data;
    }, {});
    const order = {
      ingredients,
      price,
      customer: formData,
      localId,
      date: new Date(),
    };
    await postOrder(order, idToken);
    setIsLoading(false);
    history.replace('/');
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
    <>
      {isLoading && <Spinner show={isLoading} />}
      <div className={`ContactData`}>
        <h2>Order Form</h2>
        <form onSubmit={handleFormSubmit}>
          {inputControls}
          <Button variant="secondary" disabled={!isFormValid}>
            Order
          </Button>
        </form>
      </div>
    </>
  );
}

const mapState = (state) => {
  console.log(state);
  const {
    burgerBuilder: { ingredients, price },
    auth: { idToken, localId, email },
  } = state;
  return { ingredients, price, idToken, localId, email };
};

export default connect(mapState, actionCreators)(ContactData);
