import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './ducks/auth';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';

import Layout from './layout/Layout';
import BurgerBuilder from '../features/burgerBuilder/BurgerBuilder';
import Checkout from '../features/checkout/Checkout';
import Auth from '../features/auth/Auth';
import SignOut from '../features/auth/SignOut';
import Orders from '../features/orders/Orders';

//TODO - fix: sign in is focused after signing out. it then loses focus after few seconds
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
      <Route path="/auth">
        <Auth />
      </Route>
      <Redirect to="/" />
    </Switch>
  );

  const authenticatedRoutes = (
    <Switch>
      <Route path="/" exact>
        <BurgerBuilder />
      </Route>
      <Route path="/checkout">
        <Checkout match={match} />
      </Route>
      <Route path="/orders">
        <Orders />
      </Route>
      <Route path="/signout">
        <SignOut />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
  console.log(isAuthenticated);

  return (
    <div className="App">
      <Layout>{isAuthenticated ? authenticatedRoutes : routes}</Layout>
    </div>
  );
}

const mapState = (state) => ({
  isAuthenticated: !!state.auth.idToken,
});
export default connect(mapState, actionCreators)(App);
