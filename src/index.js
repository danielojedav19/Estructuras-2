import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import FirstApp from './FirstApp';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirstApp />
  </React.StrictMode>
);


reportWebVitals();
