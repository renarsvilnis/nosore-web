'use strict';

import React, {PropTypes} from 'react';

let Header = (props) => {
  return (
    <div className="header">
      <div className="header__content">
        <img
          alt="" 
          src="images/nosore-logo.svg"
          className="header__logo"
        />
        <input
          className="header__search-input"
          onChange={props.onSearchChange}
          placeholder="Search.."
          type="text"
        />
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
