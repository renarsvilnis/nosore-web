'use strict';

import {Link} from 'redux';
import React, {PropTypes} from 'react';
import NavigationSidebarList from './navigation-sidebar-list.js';
import classNames from 'classNames';

let NavigationSidebarItem = React.createClass({

  getDefaultProps () {
    return {
      list: []
    };
  },

  propTypes: {
    list: PropTypes.array,
    navigation_item: PropTypes.bool,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string
  },

  render () {
    if (!this.props.navigation_item) {
      return null;
    }

    let title = this.props.title;

    if (this.props.depth === 2) {
      title += ` (${this.props.code})`;
    }

    console.log(this.props.id, this.props.activeMenuItem, this.props.id === this.props.activeMenuItem);

    let navItemClassNames = classNames(
      'nav-sidebar__item',
      {'nav-sidebar__item--active': this.props.id === this.props.activeMenuItem}
    );

    return (
      <div className={navItemClassNames}>
        <a href={this.props.slug}
          className={'nav-sidebar__url'}
        >{title}</a>
        <NavigationSidebarList  list={this.props.list}
          depth={this.props.depth}
          activeMenuItem={this.props.activeMenuItem}
        />
      </div>
    );
  }
});

export default NavigationSidebarItem;
