'use strict';

import React, {PropTypes} from 'react';
import classNames from 'classnames';
import NavigationSidebarItem from './navigation-sidebar-item.js';

const NavigationSidebarList = React.createClass({

  getDefaultProps () {
    return {
      depth: 0,
      list: []
    };
  },

  renderChildren () {
    let res = [];
    this.props.list.forEach((item) => {
      res.push(
        <NavigationSidebarItem
          key={item.id}
          {...item}
          depth={this.props.depth + 1}
          activeMenuItem={this.props.activeMenuItem}
        />
      );
    });

    return res;
  },

  render () {
    if (!this.props.list.length || !this.props.list[0].navigation_item) {
      return null;
    }

    console.log(this.props.depth);
    let listClassNames = classNames(
      'nav-sidebar__list',
      {'nav-sidebar__list--nested': this.props.depth}
    );

    return (
      <div className={listClassNames}>
        {this.renderChildren()}
      </div>
    );
  }
});

export default NavigationSidebarList;
