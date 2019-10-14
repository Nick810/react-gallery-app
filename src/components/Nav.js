import React from 'react';
import { Route, NavLink } from 'react-router-dom';

const Navigation = () => (
  <nav className="main-nav">
    <ul>
      <li><NavLink to="/Cats">Cats</NavLink></li>
      <li><NavLink to="/Dogs">Dogs</NavLink></li>
      <li><NavLink to="/Computers">Computers</NavLink></li>
    </ul>
  </nav>
);

export default Navigation;
