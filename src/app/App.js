import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Layout from './layout/Layout';
import BurgerBuilder from '../features/burgerBuilder/BurgerBuilder';
import Checkout from '../features/checkout/Checkout';

function App() {
  // returns match object if current location matches the given path
  const match = useRouteMatch(['/checkout']);

  const routes = (
    <Switch>
      <Route path="/" exact>
        <BurgerBuilder />
      </Route>
      <Route path="/checkout">
        <Checkout match={match} />
      </Route>
    </Switch>
  );
  return (
    <div className="App">
      <Layout>{routes}</Layout>
    </div>
  );
}

export default App;
