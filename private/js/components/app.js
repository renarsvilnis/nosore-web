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
      activeContent: mockData.patients,
      activeMenuItem: mockData.patients.id
    };
  },

  handleSearchInputChange (ev) {
    console.log('Search input ev');
  },

  render () {
    return (
      <div className="app">

        <Header
          onSearchChange={this.handleSearchInputChange}
          title={this.state.activeContent.title}
        />
        <NavSidebar {...this.state.patients} activeMenuItem={this.state.activeMenuItem} />
        <div className="content">
          <Patients node={this.state.activeContent} />
        </div>
      </div>
    );
  }
});

export default App;
