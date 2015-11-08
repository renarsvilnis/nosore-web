'use strict';

import React, {PropTypes} from 'react';
import classNames from 'classnames';
import NavigationSidebarItem from './navigation-sidebar-item.js';

let NavigationSidebarList = (props) => {
  let children = props.list.map((item) => {
    return (
      <NavigationSidebarItem
        key={item.id}
        {...item}
        depth={props.depth + 1}
      />
    );
  });

  let listClassNames = classNames(
    'nav-sidebar__list',
    {'nav-sidebar__list--nested': props.depth}
  );

  return (
    <div className={listClassNames}>
      {children}
    </div>
  );
};

NavigationSidebarList.propTypes = {
  depth: PropTypes.number.isRequired,
  list: PropTypes.array
};

NavigationSidebarList.defaultProps = {
  depth: 0,
  list: []
};

export default NavigationSidebarList;
