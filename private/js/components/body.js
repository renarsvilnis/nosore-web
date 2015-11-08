'use strict';

import React, {PropTypes} from 'react';

import Content from './navigation-sidebar-list.js';

let NavigationSidebar = (props) => {
  return (
    <div className="nav-sidebar">
      <h2>{props.title}</h2>
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
