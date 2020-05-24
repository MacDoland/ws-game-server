import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { ServerContextProvider } from '../../context/server-context';

import Home from '../Home';
import HostLobby from '../HostLobby';
import JoinLobby from '../JoinLobby';
import Lobby from '../Lobby';
import './App.scss';

function App() {
  return (
    <ServerContextProvider>
      <div className="app">
        <h1 className="h1">WebSocket/WebRTC Game Server Demo</h1>

        <Router>
          <Switch>
            <Route path="/host">
              <HostLobby />
            </Route>
            <Route path="/join">
              <JoinLobby />
            </Route>
            <Route path="/lobby">
              <Lobby />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </div>
    </ServerContextProvider>
  );
}

export default App;
