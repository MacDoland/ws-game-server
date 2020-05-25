import { serverActions, createLobbyAction } from './server-actions.js';
import {
    actions,
    createLobby as createLobbyClient,
    getLobbies as getLobbiesClient
} from '../actions';

export const connect = (url) => {
    return new WebSocket(url);
};

export const processMessage = (event, dispatch) => {

    if (typeof (event) === 'undefined' || typeof (event.data) !== 'string') {
        return;
    }

    const action = JSON.parse(event.data);
    const { type, payload } = action;

    switch (type) {
        case serverActions.lobbyCreated:
            console.log('Server Communication: Lobby Created', payload);
            dispatch(createLobbyClient(payload));
            break;
        case serverActions.getLobbies:
            console.log('Server Communication: GetLobbies', payload);
            dispatch(getLobbiesClient(payload));
            break;
        default:
            console.log('Server Communication: Unknown Message', type);
            break;
    }
}

export const createLobby = (connection, payload) => {
    const action = createLobbyAction(payload);
    connection.send(JSON.stringify(action));
}

export const getLobbies = (connection) => {
    if (connection) {
        connection.send(JSON.stringify({ type: actions.getLobbies }));
    }
};
