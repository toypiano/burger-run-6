import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../app/ducks/orders';
import { useHistory, useRouteMatch } from 'react-router-dom';

import CheckoutSummary from './CheckoutSummary';
import ContactData from './contactData/ContactData';

export function Checkout({ ingredients, match }) {
  const history = useHistory();

  const contactDataMatch = useRouteMatch(match.path + '/contact-data');

  const continueCheckout = () => {
    history.replace('/checkout/contact-data');
  };
  const cancelCheckout = () => {
    history.goBack();
  };

  return (
    <div className={`Checkout`}>
      <CheckoutSummary
        ingredients={ingredients}
        handleClickContinue={continueCheckout}
        handleClickCancel={cancelCheckout}
      />
      {contactDataMatch && <ContactData />}
    </div>
  );
}

const mapState = (state) => {
  const {
    burgerBuilder: { ingredients },
  } = state;
  return { ingredients };
};

export default connect(mapState, actionCreators)(Checkout);
