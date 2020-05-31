import React, { useEffect, useContext, useRef } from 'react';
import useInterval from '../../hooks/useInterval';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { v1 as uuidv1 } from 'uuid';
import { ConnectionContext } from '../../context/connection-context';
import { ServerContext } from '../../context/server-context';
import { newConnection, connectionActive, updateUser } from '../../actions';
import { useHistory } from "react-router-dom";
import config from '../../config/app-config';
import { connectToServerEffect } from '../../effects';

import Connect from '../Connect';
import Home from '../Home';
import HostLobby from '../HostLobby';
import JoinLobby from '../JoinLobby';
import Lobby from '../Lobby';
import './App.scss';

import { connect, processMessage, ping } from '../../scripts/network-service';

function App() {
  const [state, dispatch] = useContext(ServerContext);
  const connection = useContext(ConnectionContext);
  const history = useHistory();
  let timeoutRef = useRef({});

  useEffect(() => {
    connection.current = connectToServerEffect(dispatch, history);
  }, []);

  useEffect(() => {
    clearTimeout(timeoutRef.current);


    if (connection.current
      && state.webSocketConnectionAlive) {
      try {
        console.log('sending pong');
        connection.current.send(JSON.stringify({
          type: 'PONG'
        }));
      } catch (e) {
        connection.current.close();
        dispatch(connectionActive({
          webSocketConnectionAlive: false
        }));
      }
    }

    timeoutRef.current = setTimeout(() => {
      console.log("connection closed");
      if (connection.current) {
        connection.current.close();
        dispatch(connectionActive({
          webSocketConnectionAlive: false
        }));
      }
    }, 40000);
  }, [
    connection.current,
    state.webSocketConnectionAlive,
    state.lastPingTime
  ])

  return (
    <div className="app">
      <h1 className="h1">WebSocket/WebRTC Game Server Demo</h1>
      <p>Last ping time: {state.lastPingTime}</p>


      {state.webSocketConnectionAlive ?
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

        : <Connect />
      }
    </div>
  );
}

export default App;
