import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './ducks/auth';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Layout from './layout/Layout';
import BurgerBuilder from '../features/burgerBuilder/BurgerBuilder';
import Checkout from '../features/checkout/Checkout';
import Auth from '../features/auth/Auth';
import SignOut from '../features/auth/SignOut';

export function App({ isAuthenticated, checkAuthStatus }) {
  // returns match object if current location matches the given path
  const match = useRouteMatch(['/checkout']);
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const routes = (
    <Switch>
      <Route path="/" exact>
        <BurgerBuilder />
      </Route>
      <Route path="/checkout">
        <Checkout match={match} />
      </Route>
      <Route path="/signout">
        <SignOut />
      </Route>
      <Route path="/auth">
        <Auth />
      </Route>
    </Switch>
  );
  return (
    <div className="App">
      <Layout>{routes}</Layout>
    </div>
  );
}

const mapState = (state) => ({
  inAuthenticated: state.auth.idToken !== null,
});
export default connect(mapState, actionCreators)(App);
