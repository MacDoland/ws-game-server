import React, { useEffect, useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { v1 as uuidv1 } from 'uuid';
import { ServerContext } from '../../context/server-context';
import { newConnection, connectionActive, updateUser } from '../../actions';
import { useHistory } from "react-router-dom";
import config from '../../config/app-config';

import Home from '../Home';
import HostLobby from '../HostLobby';
import JoinLobby from '../JoinLobby';
import Lobby from '../Lobby';
import './App.scss';


import { connect, processMessage } from '../../scripts/network-service';

function App() {
  const [state, dispatch] = useContext(ServerContext);
  const history = useHistory();

  useEffect(() => {
    let userId = sessionStorage.getItem(config.gameServerUserIdKey);

    if (!userId) {
      //Generate an ID for current user
      userId = uuidv1();
      sessionStorage.setItem(config.gameServerUserIdKey, userId);
    }

    dispatch(updateUser({
      id: userId,
      name: sessionStorage.getItem(config.usernameSessionKey) || ''
    }));

    const connectionUrl = `${config.serverUrl}?userId=${userId}`;
    const connection = connect(connectionUrl);

    dispatch(newConnection({
      connection
    }));

    connection.onopen = () => {
      dispatch(connectionActive({
        webSocketConnectionAlive: true
      }));
    };

    connection.onmessage = (event) => {
      processMessage(event, dispatch, history);
    };
  }, [])

  return (
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
  );
}

export default App;
