'use strict';

import {Link} from 'redux';
import React, {PropTypes} from 'react';
import NavigationSidebarList from './navigation-sidebar-list.js';

let NavigationSidebarItem = (props) => {
  if (!props.navigation_item) {
    return null;
  }

  console.log(props);

  return (
    <div className="nav-sidebar__item">
      <Link to={props.slug}>{props.title}</Link>
      <NavigationSidebarList list={props.list} />
    </div>
  );
};

NavigationSidebarItem.propTypes = {
  list: PropTypes.array,
  navigation_item: PropTypes.bool,
  slug: PropTypes.string.isRequired,
  title: PropTypes.string
};

NavigationSidebarItem.defaultProps = {
  list: [],
  // title: '',
  // navigation_item: false
};

export default NavigationSidebarItem;
