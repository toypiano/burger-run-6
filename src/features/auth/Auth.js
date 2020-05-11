import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actionCreators from '../../app/ducks/auth';
import useImmer from '../../common/hooks/useImmer';
import Button from '../../common/ui/Button';
import Spinner from '../../common/ui/Spinner';

import initialAuthForm from './initialAuthForm';
import InputGroup from '../../common/ui/InputGroup';
import { validateInput } from '../../common/validation/inputValidation';

export function Auth({
  auth,
  isAuthenticated,
  authRedirectPath,
  setAuthRedirect,
  isBuilding,
  isOrdering,
  error,
}) {
  const [authForm, updateAuthForm] = useImmer(initialAuthForm);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // validate all input fields
  useEffect(() => {
    const isEveryInputValid = Object.values(authForm).reduce(
      (isValid, input) => isValid && input.valid,
      true
    );
    setIsFormValid(isEveryInputValid);
  }, [authForm]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Redirect to root if the user came to Auth page
    // 1. without editing the burger
    // 2. AND not by clicking 'Order Now' button
    if (!isBuilding && !isOrdering) {
      setAuthRedirect('/');
    }

    try {
      await auth(authForm.email.value, authForm.password.value, isSignIn);
      // when authenticated, redirect happens and Auth unmounts
      // so no need to setIsLoading on unmounted component
    } catch (err) {
      // only turn off spinner when auth throws error
      setIsLoading(false);
      console.log(err.response);
    }
  };

  const handleInputChange = (e, id) => {
    const value = e.target.value;
    const isValid = validateInput(value, authForm[id].validation);
    updateAuthForm((d) => {
      d[id].value = value;
      d[id].touched = true;
      d[id].valid = isValid;
    });
  };

  const handleToggleClick = () => {
    setIsSignIn((bool) => !bool);
  };

  const authInputs = Object.keys(authForm).map((id) => ({
    id,
    ...authForm[id],
  }));

  const inputControls = authInputs.map((v, i) => {
    return (
      <InputGroup
        key={v.id}
        inputType={v.inputType}
        config={v.config}
        value={v.value}
        touched={v.touched}
        valid={v.valid}
        autoFocus={i === 0}
        handleInputChange={(e) => handleInputChange(e, v.id)}
      />
    );
  });

  const errorMessage = error ? (
    <div className="Auth__error-message">
      {error.response.data.error.code} {error.response.data.error.message}
    </div>
  ) : null;

  return (
    <div className={`Auth`}>
      {/* TODO: do we really need show prop in Spinner? */}
      {isLoading && <Spinner show={isLoading} />}
      {isAuthenticated && <Redirect to={authRedirectPath} />}
      <form onSubmit={handleFormSubmit}>
        <h1>Please {isSignIn ? 'sign in' : 'sign up'}</h1>
        <div className="Auth__buttons">
          {inputControls}
          <Button type="submit" variant="success" disabled={!isFormValid}>
            {isSignIn ? 'SIGN IN' : 'SIGN UP'}
          </Button>
          <Button
            type="button"
            variant="outline-success"
            handleClick={handleToggleClick}
          >
            SWITCH TO {isSignIn ? 'SIGN UP' : 'SIGN IN'}
          </Button>
        </div>
      </form>
      {errorMessage}
    </div>
  );
}

const mapState = (state) => {
  const {
    auth: { idToken, authRedirectPath, error },
    burgerBuilder: { isBuilding, isOrdering },
  } = state;
  return {
    isAuthenticated: idToken !== null,
    authRedirectPath,
    error,
    isBuilding,
    isOrdering,
  };
};

export default connect(mapState, actionCreators)(Auth);
