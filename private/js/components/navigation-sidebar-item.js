'use strict';

import {Link} from 'redux';
import React, {PropTypes} from 'react';
import NavigationSidebarList from './navigation-sidebar-list.js';

let NavigationSidebarItem = (props) => {
  console.log(props);
  return (
    <div className="nav-sidebar__item">
      <Link to={props.slug}>{props.title}</Link>
      <NavigationSidebarList
        depth={props.depth}
        list={props.list}
      />
    </div>
  );
};

NavigationSidebarItem.propTypes = {
  id: PropTypes.string.isRequired,
  depth: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
  list: PropTypes.array,
  title: PropTypes.string.isRequired
};

NavigationSidebarItem.defaultProps = {
  list: []
};

export default NavigationSidebarItem;
