'use strict';

import React, {PropTypes} from 'react';

let Header = (props) => {
  return (
    <div className="header">
      <div className="header__content">
        <input
          className="header__search-input"
          onChange={props.onSearchChange}
          placeholder="Search.."
          type="text"
        />
        <h1 className="header__title">{props.title}</h1>
      </div>
    </div>
  );
};

Header.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

Header.defaultProps = {
  title: ''
};

export default Header;
