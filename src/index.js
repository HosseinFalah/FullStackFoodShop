import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { StateProvider } from './Context/StateProvider';
import { initialState } from './Context/initalState';
import reducer from './Context/reducer';
import './index.css';

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <Router>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </Router>
);