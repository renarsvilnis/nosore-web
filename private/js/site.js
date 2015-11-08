/* global location */
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import {Provider} from 'react-redux';
import io from 'socket.io-client';

import App from './components/app';
import Pacients from './components/pacients';
import {setState} from './action-creators';
import store from './store';

// handle all socket.io stuff
const socket = io(`${location.protocol}//${location.hostname}:${location.port}`);
socket.on('state', (state) => setState(state));

const routes = (
  <Route component={App}>
    <Route
      component={Pacients}
      path="/"
    />
    <Route
      component={Pacients}
      path="/hello"
    />
  </Route>
);

const router = (
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      {routes}
    </Router>
  </Provider>
  <DebugPanel top right bottom>
    <DevTools store={store} monitor={LogMonitor} />
  </DebugPanel>
);

ReactDOM.render(router, document.querySelector('.app-container'));
