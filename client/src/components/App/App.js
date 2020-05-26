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

    //Generate an ID for current user
    //TODO: sessions?
    let userId = sessionStorage.getItem('game-server-user-id');

    if(!userId){
      userId = uuidv1();
      sessionStorage.setItem('game-server-user-id', userId);
    }

    console.log('userId', userId);

    dispatch(updateUser({
      id: userId
    }));

    let connection = connect(`ws://localhost:8080?userId=${userId}`);

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
