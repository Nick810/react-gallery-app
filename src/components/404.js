import React from 'react';
const logo = require('./images/ban-solid.svg');

const NotFound404 = () => (
  <div className="page-not-found">
    <img id="not-found-logo" src={logo} alt="ban"/>
    <h2>404</h2>
    <h3>Whoops! Page Not Found</h3>
  </div>
);

export default NotFound404;
