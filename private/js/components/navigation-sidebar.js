'use strict';

import React, {PropTypes} from 'react';

import NavigationSidebarList from './navigation-sidebar-list.js';
import NavigationSidebarItem from './navigation-sidebar-item.js';

// <NavigationSidebarList list={props.list} activeMenuItem={props.activeMenuItem} />

let NavigationSidebar = (props) => {
  return (
    <div className="nav-sidebar">
      <NavigationSidebarItem
          key={props.id}
          {...props}
          depth={1}
          activeMenuItem={
            props.activeMenuItem}
        />
    </div>
  );
};

NavigationSidebar.propTypes = {
  list: PropTypes.array,
  title: PropTypes.string
};

NavigationSidebar.defaultProps = {
  list: [],
  title: ''
};

export default NavigationSidebar;
