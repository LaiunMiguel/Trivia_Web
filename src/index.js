import React from 'react';
import ReactDOM from 'react-dom/client';
import MyRoutes from './MyRoutes';
import reportWebVitals from './reportWebVitals';
import './assets/css/global.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MyRoutes/>
  </React.StrictMode>
);

reportWebVitals();
