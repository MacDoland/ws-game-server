import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/App/App.js';
import * as serviceWorker from './serviceWorker';
import { ConnectionContextProvider } from './context/connection-context';
import { ServerContextProvider } from './context/server-context';

ReactDOM.render(
  <React.StrictMode>
    <ConnectionContextProvider>
      <ServerContextProvider>
        <App />
      </ServerContextProvider>
    </ConnectionContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
