import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { positions, Provider as ALertprovider, transitions } from 'react-alert'
import alertTemplate from 'react-alert-template-basic'

const options = {
  timeout: 5000,
  positions: positions.BOTTOM_RIGHT,
  transitions: transitions.SCALE
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ALertprovider template={alertTemplate} {...options}>
      <App />
    </ALertprovider>
  </React.StrictMode>
);
