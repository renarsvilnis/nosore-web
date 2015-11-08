'use strict';

import React, {PropTypes} from 'react';
// import PureRenderMixin from 'react-addons-pure-render-mixin';

import Header from './header.js';
import NavSidebar from './navigation-sidebar';
import Patients from './patients';

import mockData from '../../../data';

export const App = React.createClass({
  // mixins: [PureRenderMixin],

  getInitialState () {
    return {
      patients: mockData.patients,
      activeContent: mockData.patients
    };
  },

  handleSearchInputChange (ev) {
    console.log('Search input ev');
  },

  // {/*<NavSidebar {...this.state.activeContent} />*/}
  render () {
    console.log(this.state);
    return (
      <div className="app">

        <Header
          onSearchChange={this.handleSearchInputChange}
          title={this.state.activeContent.title}
        />
        <div className="content">
          <Patients node={this.state.activeContent} />
        </div>
      </div>
    );
  }
});

export default App;
