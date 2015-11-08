'use strict';

import React, {PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

import Header from './header.js';
import NavSidebar from './navigation-sidebar';

import mockData from '../../../data';

export const App = React.createClass({
  propTypes: {
    activePacients: PropTypes.array,
    activeTitle: PropTypes.string,
    pacients: PropTypes.array
  },

  mixins: [PureRenderMixin],

  getInitialState () {
    return {
      pacients: mockData.pacients,
      activeContent: mockData.pacients
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
        <NavSidebar {...this.state.activeContent} />
        <div className="content">{this.props.children}</div>
      </div>
    );
  }
});

export default App;
