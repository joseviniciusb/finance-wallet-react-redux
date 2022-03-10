import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';

import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Provider store={ store }>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => <Login { ...props } /> }
          />
          <Route
            exact
            path="/carteira"
            render={ (props) => <Wallet { ...props } /> }
          />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
