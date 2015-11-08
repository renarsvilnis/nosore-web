'use strict';

import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import NavigationSidebarList from './navigation-sidebar-list.js';

let NavigationSidebar = (props) => {
  return (
    <div className="nav-sidebar">
      <h2>{props.title}</h2>
      <Link to="/hello">Hello world</Link>
      <NavigationSidebarList list={props.list} />
    </div>
  );
};

NavigationSidebar.propTypes = {
  list: PropTypes.array,
  title: PropTypes.string
};

NavigationSidebar.defaultProps = {
  list: []
};

export default NavigationSidebar;
