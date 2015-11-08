'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import App from './components/app';
import Pacients from './components/pacients';

const routes = (
  <Route component={App}>
    <Route
      component={Pacients}
      path="/"
    />
  </Route>
);

const router = (
  <Router history={createBrowserHistory()}>
    {routes}
  </Router>
);

ReactDOM.render(router, document.querySelector('.app-container'));
