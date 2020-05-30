import React, { useEffect, useContext, useRef } from 'react';
import useInterval from '../../hooks/useInterval';
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


import { connect, processMessage, ping } from '../../scripts/network-service';

function App() {
  const [state, dispatch] = useContext(ServerContext);
  const history = useHistory();
  let timeoutRef = useRef({});

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

  }, []);

  useEffect(() => {
    clearTimeout(timeoutRef.current);

    if (state.webSocketConnection
      && state.webSocketConnectionAlive) {
      console.log('sending pong');
      state.webSocketConnection.send(JSON.stringify({
        type: 'PONG'
      }));
    }

    timeoutRef.current = setTimeout(() => {
      console.log("connection closed");
      if (state.webSocketConnection) {
        state.webSocketConnection.close();
      }
    }, 40000);
  }, [
    state.webSocketConnection,
    state.webSocketConnectionAlive,
    state.lastPingTime
  ])

  return (
    <div className="app">
      <h1 className="h1">WebSocket/WebRTC Game Server Demo</h1>
      <p>Last ping time: { state.lastPingTime }</p>
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
