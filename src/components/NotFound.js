import React from 'react';
const logo = require('./images/ban-solid.svg');

const NotFound = () => (
  <li className="not-found">
    <img id="not-found-logo" src={logo} />
    <h3>No Results Found</h3>
    <p>Your search did not return any results. Please try again.</p>
  </li>
);

export default NotFound;
