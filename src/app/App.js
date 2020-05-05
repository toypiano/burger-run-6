import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './layout/Layout';
import BurgerBuilder from '../features/burgerBuilder/BurgerBuilder';

function App() {
  const routes = (
    <Switch>
      <Route path="/" exact component={BurgerBuilder} />
    </Switch>
  );
  return (
    <div className="App">
      <Layout>{routes}</Layout>
    </div>
  );
}

export default App;
