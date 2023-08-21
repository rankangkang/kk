import React from 'react';
import ReactDOM from 'react-dom';
import Page from './pages';
import './assets/styles/global.less';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Page />
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
