'use strict';

import React, {PropTypes} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import * as actionCreators from '../action-creators';

import Header from './header.js';
import NavSidebar from './navigation-sidebar';

export const App = React.createClass({
  propTypes: {
    pacients: PropTypes.array,
    activePacients: PropTypes.array,
    activeTitle: PropTypes.string
  },

  mixins: [PureRenderMixin],

  handleSearchInputChange (ev) {
    console.log('Search input ev');
  },

  render () {
    return (
      <div className="app">

        <Header
          onSearchChange={this.handleSearchInputChange}
          title={this.state.title}
        />
        <NavSidebar {...this.state.navigation} />
        <div className="content">{this.props.pacients}</div>
      </div>
    );
  }
});

function mapStateToProps (state) {
  console.log(state);
  return {
    pacients: state.get('pacients'),
    activePacients: state.get('active-pacients'),
    activeTitle: state.get('active-title')
  };
}

export const AppContainer = connect(
  mapStateToProps,
  actionCreators
)(App);
export default App;
