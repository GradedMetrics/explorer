import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

if (!/^\?p=/.test(window.location.search)) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}