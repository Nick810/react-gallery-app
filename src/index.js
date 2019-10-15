import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './css/index.css';
import * as serviceWorker from './components/serviceWorker';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

serviceWorker.unregister();
