'use strict';

import React from 'react';

let fakeContent = [];
for (let i = 0; i < 100; i++) {
  fakeContent.push(<h3>{'Hello world'}</h3>);
}

let Pacients = (props) => {
  return (
    <div className="nav-sidebar__item">
      {fakeContent}
    </div>
  );
};

export default Pacients;
