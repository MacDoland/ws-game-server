import { serverActions, createLobbyAction } from './server-actions.js';
import { createLobby as createLobbyClient } from '../actions';

export const connect = (url) => {
    return new WebSocket(url);
};

export const createLobby = (connection, payload) => {
    const action = createLobbyAction(payload);
    connection.send(JSON.stringify(action));
}

export const processMessage = (event, dispatch) => {

    if (typeof (event) === 'undefined' || typeof (event.data) !== 'string') {
        return;
    }

    const action = JSON.parse(event.data);
    const { type, payload } = action;

    switch (type) {
        case serverActions.lobbyCreated:
            console.log('Server Communication: Lobby Created', payload );
            dispatch(createLobbyClient(payload));
            break;
        default:
            console.log('Server Communication: Unknown Message', type);
            break;
    }

}