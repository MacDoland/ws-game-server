
import { createLobby } from '../scripts/network-service';
import config from '../config/app-config';
import { newConnection, connectionActive, updateUser } from '../actions';
import { connect, processMessage, ping } from '../scripts/network-service';
import { v1 as uuidv1 } from 'uuid';


export const connectToServerEffect = (dispatch, history) => {
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

    const onOpen = () => {
      dispatch(connectionActive({
        webSocketConnectionAlive: true
      }));
    };

    const onMessage = (event) => {
      processMessage(event, dispatch, history);
    };

    const onClose = () => {
      dispatch(connectionActive({
        webSocketConnectionAlive: false
      }));
    };


    const connection = connect(connectionUrl, onOpen, onMessage, onClose);

    dispatch(newConnection({
      connection
    }));

  }

export const createLobbyEffect = (isConnectionAlive, shouldSubmitLobby, connection, lobbyName ) => {
    if (isConnectionAlive && shouldSubmitLobby) {
        createLobby(connection, {
            lobbyName
        });
    }
};

export const storeUsernameEffect = (username) => {
    if (username && username !== '') {
        sessionStorage.setItem(config.usernameSessionKey, username);
    }
}